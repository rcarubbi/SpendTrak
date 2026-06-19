// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import type { MonthData } from "../types";
const HANDLE_KEY = stryMutAct_9fa48("2552") ? "" : (stryCov_9fa48("2552"), "data-dir-handle");
const DB_NAME = stryMutAct_9fa48("2553") ? "" : (stryCov_9fa48("2553"), "SpendTrak-fs");
const STORE_NAME = stryMutAct_9fa48("2554") ? "" : (stryCov_9fa48("2554"), "handles");
let dirHandle: FileSystemDirectoryHandle | null = null;
interface PermissionHandle {
  queryPermission: (opts: Record<string, string>) => Promise<string>;
  requestPermission: (opts: Record<string, string>) => Promise<string>;
}
function openDB(): Promise<IDBDatabase> {
  if (stryMutAct_9fa48("2555")) {
    {}
  } else {
    stryCov_9fa48("2555");
    return new Promise((resolve, reject) => {
      if (stryMutAct_9fa48("2556")) {
        {}
      } else {
        stryCov_9fa48("2556");
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = stryMutAct_9fa48("2557") ? () => undefined : (stryCov_9fa48("2557"), () => req.result.createObjectStore(STORE_NAME));
        req.onsuccess = stryMutAct_9fa48("2558") ? () => undefined : (stryCov_9fa48("2558"), () => resolve(req.result));
        req.onerror = stryMutAct_9fa48("2559") ? () => undefined : (stryCov_9fa48("2559"), () => reject(req.error));
      }
    });
  }
}
async function storeHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  if (stryMutAct_9fa48("2560")) {
    {}
  } else {
    stryCov_9fa48("2560");
    const db = await openDB();
    return new Promise((resolve, reject) => {
      if (stryMutAct_9fa48("2561")) {
        {}
      } else {
        stryCov_9fa48("2561");
        const tx = db.transaction(STORE_NAME, stryMutAct_9fa48("2562") ? "" : (stryCov_9fa48("2562"), "readwrite"));
        tx.objectStore(STORE_NAME).put(handle, HANDLE_KEY);
        tx.oncomplete = stryMutAct_9fa48("2563") ? () => undefined : (stryCov_9fa48("2563"), () => resolve());
        tx.onerror = stryMutAct_9fa48("2564") ? () => undefined : (stryCov_9fa48("2564"), () => reject(tx.error));
      }
    });
  }
}
async function loadStoredHandle(): Promise<FileSystemDirectoryHandle | null> {
  if (stryMutAct_9fa48("2565")) {
    {}
  } else {
    stryCov_9fa48("2565");
    try {
      if (stryMutAct_9fa48("2566")) {
        {}
      } else {
        stryCov_9fa48("2566");
        const db = await openDB();
        return new Promise((resolve, reject) => {
          if (stryMutAct_9fa48("2567")) {
            {}
          } else {
            stryCov_9fa48("2567");
            const tx = db.transaction(STORE_NAME, stryMutAct_9fa48("2568") ? "" : (stryCov_9fa48("2568"), "readonly"));
            const req = tx.objectStore(STORE_NAME).get(HANDLE_KEY);
            req.onsuccess = stryMutAct_9fa48("2569") ? () => undefined : (stryCov_9fa48("2569"), () => resolve(stryMutAct_9fa48("2572") ? req.result && null : stryMutAct_9fa48("2571") ? false : stryMutAct_9fa48("2570") ? true : (stryCov_9fa48("2570", "2571", "2572"), req.result || null)));
            req.onerror = stryMutAct_9fa48("2573") ? () => undefined : (stryCov_9fa48("2573"), () => reject(req.error));
          }
        });
      }
    } catch (err) {
      if (stryMutAct_9fa48("2574")) {
        {}
      } else {
        stryCov_9fa48("2574");
        console.error(stryMutAct_9fa48("2575") ? "" : (stryCov_9fa48("2575"), "fs: loadStoredHandle failed"), err);
        return null;
      }
    }
  }
}
async function verifyPermission(handle: FileSystemDirectoryHandle, write: boolean): Promise<boolean> {
  if (stryMutAct_9fa48("2576")) {
    {}
  } else {
    stryCov_9fa48("2576");
    const h = handle as unknown as PermissionHandle;
    const opts: Record<string, string> = {};
    if (stryMutAct_9fa48("2578") ? false : stryMutAct_9fa48("2577") ? true : (stryCov_9fa48("2577", "2578"), write)) opts.mode = stryMutAct_9fa48("2579") ? "" : (stryCov_9fa48("2579"), "readwrite");
    const result = await h.queryPermission(opts);
    if (stryMutAct_9fa48("2582") ? result !== "granted" : stryMutAct_9fa48("2581") ? false : stryMutAct_9fa48("2580") ? true : (stryCov_9fa48("2580", "2581", "2582"), result === (stryMutAct_9fa48("2583") ? "" : (stryCov_9fa48("2583"), "granted")))) return stryMutAct_9fa48("2584") ? false : (stryCov_9fa48("2584"), true);
    if (stryMutAct_9fa48("2587") ? result !== "prompt" : stryMutAct_9fa48("2586") ? false : stryMutAct_9fa48("2585") ? true : (stryCov_9fa48("2585", "2586", "2587"), result === (stryMutAct_9fa48("2588") ? "" : (stryCov_9fa48("2588"), "prompt")))) {
      if (stryMutAct_9fa48("2589")) {
        {}
      } else {
        stryCov_9fa48("2589");
        const req = await h.requestPermission(opts);
        return stryMutAct_9fa48("2592") ? req !== "granted" : stryMutAct_9fa48("2591") ? false : stryMutAct_9fa48("2590") ? true : (stryCov_9fa48("2590", "2591", "2592"), req === (stryMutAct_9fa48("2593") ? "" : (stryCov_9fa48("2593"), "granted")));
      }
    }
    return stryMutAct_9fa48("2594") ? true : (stryCov_9fa48("2594"), false);
  }
}
export async function ensureDataDir(): Promise<FileSystemDirectoryHandle | null> {
  if (stryMutAct_9fa48("2595")) {
    {}
  } else {
    stryCov_9fa48("2595");
    try {
      if (stryMutAct_9fa48("2596")) {
        {}
      } else {
        stryCov_9fa48("2596");
        if (stryMutAct_9fa48("2598") ? false : stryMutAct_9fa48("2597") ? true : (stryCov_9fa48("2597", "2598"), dirHandle)) {
          if (stryMutAct_9fa48("2599")) {
            {}
          } else {
            stryCov_9fa48("2599");
            const ok = await verifyPermission(dirHandle, stryMutAct_9fa48("2600") ? false : (stryCov_9fa48("2600"), true));
            if (stryMutAct_9fa48("2602") ? false : stryMutAct_9fa48("2601") ? true : (stryCov_9fa48("2601", "2602"), ok)) return dirHandle;
            dirHandle = null;
          }
        }
        const stored = await loadStoredHandle();
        if (stryMutAct_9fa48("2604") ? false : stryMutAct_9fa48("2603") ? true : (stryCov_9fa48("2603", "2604"), stored)) {
          if (stryMutAct_9fa48("2605")) {
            {}
          } else {
            stryCov_9fa48("2605");
            const ok = await verifyPermission(stored, stryMutAct_9fa48("2606") ? false : (stryCov_9fa48("2606"), true));
            if (stryMutAct_9fa48("2608") ? false : stryMutAct_9fa48("2607") ? true : (stryCov_9fa48("2607", "2608"), ok)) {
              if (stryMutAct_9fa48("2609")) {
                {}
              } else {
                stryCov_9fa48("2609");
                dirHandle = stored;
                return dirHandle;
              }
            }
          }
        }
      }
    } catch (err) {
      if (stryMutAct_9fa48("2610")) {
        {}
      } else {
        stryCov_9fa48("2610");
        console.error(stryMutAct_9fa48("2611") ? "" : (stryCov_9fa48("2611"), "fs: ensureDataDir failed"), err);
        dirHandle = null;
      }
    }
    return null;
  }
}
export async function pickDataDir(): Promise<FileSystemDirectoryHandle> {
  if (stryMutAct_9fa48("2612")) {
    {}
  } else {
    stryCov_9fa48("2612");
    const w = window as unknown as {
      showDirectoryPicker: (opts?: Record<string, string>) => Promise<FileSystemDirectoryHandle>;
    };
    const handle = await w.showDirectoryPicker(stryMutAct_9fa48("2613") ? {} : (stryCov_9fa48("2613"), {
      mode: stryMutAct_9fa48("2614") ? "" : (stryCov_9fa48("2614"), "readwrite")
    }));
    await storeHandle(handle);
    dirHandle = handle;
    return handle;
  }
}
function monthFileName(year: number, month: number): string {
  if (stryMutAct_9fa48("2615")) {
    {}
  } else {
    stryCov_9fa48("2615");
    return stryMutAct_9fa48("2616") ? `` : (stryCov_9fa48("2616"), `${year}-${String(month).padStart(2, stryMutAct_9fa48("2617") ? "" : (stryCov_9fa48("2617"), "0"))}.json`);
  }
}
export async function readJSON(filename: string): Promise<unknown | null> {
  if (stryMutAct_9fa48("2618")) {
    {}
  } else {
    stryCov_9fa48("2618");
    if (stryMutAct_9fa48("2621") ? false : stryMutAct_9fa48("2620") ? true : stryMutAct_9fa48("2619") ? dirHandle : (stryCov_9fa48("2619", "2620", "2621"), !dirHandle)) return null;
    try {
      if (stryMutAct_9fa48("2622")) {
        {}
      } else {
        stryCov_9fa48("2622");
        const fileHandle = await dirHandle.getFileHandle(filename);
        const file = await fileHandle.getFile();
        const text = await file.text();
        return JSON.parse(text) as unknown;
      }
    } catch (err) {
      if (stryMutAct_9fa48("2623")) {
        {}
      } else {
        stryCov_9fa48("2623");
        console.error(stryMutAct_9fa48("2624") ? "" : (stryCov_9fa48("2624"), "fs: readJSON failed for"), filename, err);
        return null;
      }
    }
  }
}
export async function writeJSON(filename: string, data: unknown): Promise<void> {
  if (stryMutAct_9fa48("2625")) {
    {}
  } else {
    stryCov_9fa48("2625");
    if (stryMutAct_9fa48("2628") ? false : stryMutAct_9fa48("2627") ? true : stryMutAct_9fa48("2626") ? dirHandle : (stryCov_9fa48("2626", "2627", "2628"), !dirHandle)) throw new Error(stryMutAct_9fa48("2629") ? "" : (stryCov_9fa48("2629"), "Data directory not selected"));
    const fileHandle = await dirHandle.getFileHandle(filename, stryMutAct_9fa48("2630") ? {} : (stryCov_9fa48("2630"), {
      create: stryMutAct_9fa48("2631") ? false : (stryCov_9fa48("2631"), true)
    }));
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
  }
}
function isValidMonthData(data: unknown): data is MonthData {
  if (stryMutAct_9fa48("2632")) {
    {}
  } else {
    stryCov_9fa48("2632");
    if (stryMutAct_9fa48("2635") ? !data && typeof data !== "object" : stryMutAct_9fa48("2634") ? false : stryMutAct_9fa48("2633") ? true : (stryCov_9fa48("2633", "2634", "2635"), (stryMutAct_9fa48("2636") ? data : (stryCov_9fa48("2636"), !data)) || (stryMutAct_9fa48("2638") ? typeof data === "object" : stryMutAct_9fa48("2637") ? false : (stryCov_9fa48("2637", "2638"), typeof data !== (stryMutAct_9fa48("2639") ? "" : (stryCov_9fa48("2639"), "object")))))) return stryMutAct_9fa48("2640") ? true : (stryCov_9fa48("2640"), false);
    const d = data as Record<string, unknown>;
    return stryMutAct_9fa48("2643") ? typeof d.year === "number" && typeof d.month === "number" || Array.isArray(d.transactions) : stryMutAct_9fa48("2642") ? false : stryMutAct_9fa48("2641") ? true : (stryCov_9fa48("2641", "2642", "2643"), (stryMutAct_9fa48("2645") ? typeof d.year === "number" || typeof d.month === "number" : stryMutAct_9fa48("2644") ? true : (stryCov_9fa48("2644", "2645"), (stryMutAct_9fa48("2647") ? typeof d.year !== "number" : stryMutAct_9fa48("2646") ? true : (stryCov_9fa48("2646", "2647"), typeof d.year === (stryMutAct_9fa48("2648") ? "" : (stryCov_9fa48("2648"), "number")))) && (stryMutAct_9fa48("2650") ? typeof d.month !== "number" : stryMutAct_9fa48("2649") ? true : (stryCov_9fa48("2649", "2650"), typeof d.month === (stryMutAct_9fa48("2651") ? "" : (stryCov_9fa48("2651"), "number")))))) && Array.isArray(d.transactions));
  }
}
export async function readMonthData(year: number, month: number): Promise<MonthData | null> {
  if (stryMutAct_9fa48("2652")) {
    {}
  } else {
    stryCov_9fa48("2652");
    const data = await readJSON(monthFileName(year, month));
    return isValidMonthData(data) ? data : null;
  }
}
export async function writeMonthData(data: MonthData): Promise<void> {
  if (stryMutAct_9fa48("2653")) {
    {}
  } else {
    stryCov_9fa48("2653");
    await writeJSON(monthFileName(data.year, data.month), data);
  }
}
export async function listMonthFiles(): Promise<string[]> {
  if (stryMutAct_9fa48("2654")) {
    {}
  } else {
    stryCov_9fa48("2654");
    if (stryMutAct_9fa48("2657") ? false : stryMutAct_9fa48("2656") ? true : stryMutAct_9fa48("2655") ? dirHandle : (stryCov_9fa48("2655", "2656", "2657"), !dirHandle)) return stryMutAct_9fa48("2658") ? ["Stryker was here"] : (stryCov_9fa48("2658"), []);
    const files: string[] = stryMutAct_9fa48("2659") ? ["Stryker was here"] : (stryCov_9fa48("2659"), []);
    for await (const entry of dirHandle.values()) {
      if (stryMutAct_9fa48("2660")) {
        {}
      } else {
        stryCov_9fa48("2660");
        if (stryMutAct_9fa48("2663") ? entry.kind === "file" || /^\d{4}-\d{2}\.json$/.test(entry.name) : stryMutAct_9fa48("2662") ? false : stryMutAct_9fa48("2661") ? true : (stryCov_9fa48("2661", "2662", "2663"), (stryMutAct_9fa48("2665") ? entry.kind !== "file" : stryMutAct_9fa48("2664") ? true : (stryCov_9fa48("2664", "2665"), entry.kind === (stryMutAct_9fa48("2666") ? "" : (stryCov_9fa48("2666"), "file")))) && (stryMutAct_9fa48("2672") ? /^\d{4}-\D{2}\.json$/ : stryMutAct_9fa48("2671") ? /^\d{4}-\d\.json$/ : stryMutAct_9fa48("2670") ? /^\D{4}-\d{2}\.json$/ : stryMutAct_9fa48("2669") ? /^\d-\d{2}\.json$/ : stryMutAct_9fa48("2668") ? /^\d{4}-\d{2}\.json/ : stryMutAct_9fa48("2667") ? /\d{4}-\d{2}\.json$/ : (stryCov_9fa48("2667", "2668", "2669", "2670", "2671", "2672"), /^\d{4}-\d{2}\.json$/)).test(entry.name))) {
          if (stryMutAct_9fa48("2673")) {
            {}
          } else {
            stryCov_9fa48("2673");
            files.push(entry.name);
          }
        }
      }
    }
    return stryMutAct_9fa48("2674") ? files : (stryCov_9fa48("2674"), files.sort());
  }
}
export async function listAllMonthData(): Promise<MonthData[]> {
  if (stryMutAct_9fa48("2675")) {
    {}
  } else {
    stryCov_9fa48("2675");
    const files = await listMonthFiles();
    const results: MonthData[] = stryMutAct_9fa48("2676") ? ["Stryker was here"] : (stryCov_9fa48("2676"), []);
    for (const f of files) {
      if (stryMutAct_9fa48("2677")) {
        {}
      } else {
        stryCov_9fa48("2677");
        try {
          if (stryMutAct_9fa48("2678")) {
            {}
          } else {
            stryCov_9fa48("2678");
            const data = await readJSON(f);
            if (stryMutAct_9fa48("2681") ? data && typeof data === "object" || "transactions" in (data as Record<string, unknown>) : stryMutAct_9fa48("2680") ? false : stryMutAct_9fa48("2679") ? true : (stryCov_9fa48("2679", "2680", "2681"), (stryMutAct_9fa48("2683") ? data || typeof data === "object" : stryMutAct_9fa48("2682") ? true : (stryCov_9fa48("2682", "2683"), data && (stryMutAct_9fa48("2685") ? typeof data !== "object" : stryMutAct_9fa48("2684") ? true : (stryCov_9fa48("2684", "2685"), typeof data === (stryMutAct_9fa48("2686") ? "" : (stryCov_9fa48("2686"), "object")))))) && (stryMutAct_9fa48("2687") ? "" : (stryCov_9fa48("2687"), "transactions")) in (data as Record<string, unknown>))) {
              if (stryMutAct_9fa48("2688")) {
                {}
              } else {
                stryCov_9fa48("2688");
                results.push(data as MonthData);
              }
            }
          }
        } catch (err) {
          if (stryMutAct_9fa48("2689")) {
            {}
          } else {
            stryCov_9fa48("2689");
            console.error(stryMutAct_9fa48("2690") ? "" : (stryCov_9fa48("2690"), "fs: listAllMonthData skip corrupt file"), f, err);
          }
        }
      }
    }
    return results;
  }
}