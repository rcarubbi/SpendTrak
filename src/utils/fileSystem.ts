import type { MonthData } from "../types";

const HANDLE_KEY = "data-dir-handle";
const DB_NAME = "spending-fs";
const STORE_NAME = "handles";

let dirHandle: FileSystemDirectoryHandle | null = null;

interface PermissionHandle {
  queryPermission: (opts: Record<string, string>) => Promise<string>;
  requestPermission: (opts: Record<string, string>) => Promise<string>;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function storeHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(handle, HANDLE_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadStoredHandle(): Promise<FileSystemDirectoryHandle | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(HANDLE_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("fs: loadStoredHandle failed", err);
    return null;
  }
}

async function verifyPermission(handle: FileSystemDirectoryHandle, write: boolean): Promise<boolean> {
  const h = handle as unknown as PermissionHandle;
  const opts: Record<string, string> = {};
  if (write) opts.mode = "readwrite";
  const result = await h.queryPermission(opts);
  if (result === "granted") return true;
  if (result === "prompt") {
    const req = await h.requestPermission(opts);
    return req === "granted";
  }
  return false;
}

export async function ensureDataDir(): Promise<FileSystemDirectoryHandle | null> {
  try {
    if (dirHandle) {
      const ok = await verifyPermission(dirHandle, true);
      if (ok) return dirHandle;
      dirHandle = null;
    }

    const stored = await loadStoredHandle();
    if (stored) {
      const ok = await verifyPermission(stored, true);
      if (ok) {
        dirHandle = stored;
        return dirHandle;
      }
    }
  } catch (err) {
    console.error("fs: ensureDataDir failed", err);
    dirHandle = null;
  }
  return null;
}

export async function pickDataDir(): Promise<FileSystemDirectoryHandle> {
  const w = window as unknown as { showDirectoryPicker: (opts?: Record<string, string>) => Promise<FileSystemDirectoryHandle> };
  const handle = await w.showDirectoryPicker({ mode: "readwrite" });
  await storeHandle(handle);
  dirHandle = handle;
  return handle;
}

function monthFileName(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}.json`;
}

export async function readJSON(filename: string): Promise<unknown | null> {
  if (!dirHandle) return null;
  try {
    const fileHandle = await dirHandle.getFileHandle(filename);
    const file = await fileHandle.getFile();
    const text = await file.text();
    return JSON.parse(text) as unknown;
  } catch (err) {
    console.error("fs: readJSON failed for", filename, err);
    return null;
  }
}

export async function writeJSON(filename: string, data: unknown): Promise<void> {
  if (!dirHandle) throw new Error("Data directory not selected");
  const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(data, null, 2));
  await writable.close();
}

function isValidMonthData(data: unknown): data is MonthData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return typeof d.year === "number" && typeof d.month === "number" && Array.isArray(d.transactions);
}

export async function readMonthData(year: number, month: number): Promise<MonthData | null> {
  const data = await readJSON(monthFileName(year, month));
  return isValidMonthData(data) ? data : null;
}

export async function writeMonthData(data: MonthData): Promise<void> {
  await writeJSON(monthFileName(data.year, data.month), data);
}

export async function listMonthFiles(): Promise<string[]> {
  if (!dirHandle) return [];
  const files: string[] = [];
  for await (const entry of dirHandle.values()) {
    if (entry.kind === "file" && /^\d{4}-\d{2}\.json$/.test(entry.name)) {
      files.push(entry.name);
    }
  }
  return files.sort();
}

export async function listAllMonthData(): Promise<MonthData[]> {
  const files = await listMonthFiles();
  const results: MonthData[] = [];
  for (const f of files) {
    try {
      const data = await readJSON(f);
      if (data && typeof data === "object" && "transactions" in (data as Record<string, unknown>)) {
        results.push(data as MonthData);
      }
    } catch (err) { console.error("fs: listAllMonthData skip corrupt file", f, err); }
  }
  return results;
}
