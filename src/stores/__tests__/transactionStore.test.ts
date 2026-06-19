import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTransactionStore, getLoadedMonths, getPossibleDuplicates, loadMonthData } from "../transactionStore";
import type { Transaction, MonthData } from "../../types";

const mockTx: Transaction = {
  id: "1", date: "2024-01-01", amount: 100, description: "test",
  subcategory: "", categoryId: "food", account: "acc1", source: "csv",
};

const mockMonth: MonthData = {
  year: 2024, month: 1, transactions: [mockTx], uploadedAt: "2024-01-01T00:00:00Z",
};

describe("transactionStore", { tags: ["unit"] }, () => {
beforeEach(() => {
  useTransactionStore.setState({ months: {}, loaded: false });
  const fs = vi.mocked(vi.importActual("../../utils/fileSystem"));
});

describe("transactionStore", () => {
  it("loadMonthData returns null for missing month", () => {
    expect(useTransactionStore.getState().loadMonthData(2024, 1)).toBeNull();
  });

  it("loadMonthData returns data when present", () => {
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });
    const result = useTransactionStore.getState().loadMonthData(2024, 1);
    expect(result).toEqual(mockMonth);
  });

  it("saveMonthData merges transactions and persists", async () => {
    const fs = await import("../../utils/fileSystem");
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });

    const tx2: Transaction = {
      id: "2", date: "2024-01-01", amount: 200, description: "test2",
      subcategory: "", categoryId: "transport", account: "acc1", source: "csv",
    };
    const newData: MonthData = {
      year: 2024, month: 1, transactions: [tx2], uploadedAt: "2024-01-02T00:00:00Z",
    };

    await useTransactionStore.getState().saveMonthData(newData);
    expect(fs.writeMonthData).toHaveBeenCalled();
    const stored = useTransactionStore.getState().months["2024-01"];
    expect(stored.transactions).toHaveLength(2);
  });

  it("saveMonthData throws on write failure", async () => {
    const fs = await import("../../utils/fileSystem");
    vi.mocked(fs.writeMonthData).mockRejectedValueOnce(new Error("disk full"));

    await expect(
      useTransactionStore.getState().saveMonthData(mockMonth)
    ).rejects.toThrow("disk full");
  });

  it("deleteTransaction removes transaction and persists", async () => {
    const fs = await import("../../utils/fileSystem");
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });

    await useTransactionStore.getState().deleteTransaction(2024, 1, "1");
    expect(fs.writeMonthData).toHaveBeenCalled();
    expect(useTransactionStore.getState().months["2024-01"].transactions).toHaveLength(0);
  });

  it("deleteTransaction throws on write failure", async () => {
    const fs = await import("../../utils/fileSystem");
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });
    vi.mocked(fs.writeMonthData).mockRejectedValueOnce(new Error("disk full"));

    await expect(
      useTransactionStore.getState().deleteTransaction(2024, 1, "1")
    ).rejects.toThrow("disk full");
  });

  it("updateTransaction updates fields and persists", async () => {
    const fs = await import("../../utils/fileSystem");
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });

    await useTransactionStore.getState().updateTransaction("1", { categoryId: "transport" });
    expect(fs.writeMonthData).toHaveBeenCalled();
    expect(useTransactionStore.getState().months["2024-01"].transactions[0].categoryId).toBe("transport");
  });

  it("updateTransaction throws on write failure", async () => {
    const fs = await import("../../utils/fileSystem");
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });
    vi.mocked(fs.writeMonthData).mockRejectedValueOnce(new Error("disk full"));

    await expect(
      useTransactionStore.getState().updateTransaction("1", { categoryId: "transport" })
    ).rejects.toThrow("disk full");
  });

  it("reclassifyAll reclassifies transactions", async () => {
    const fs = await import("../../utils/fileSystem");
    const tx: Transaction = { ...mockTx, categoryId: "old-cat" };
    useTransactionStore.setState({ months: { "2024-01": { ...mockMonth, transactions: [tx] } } });
    const categories = [
      { id: "food", name: "Food", color: "#ef4444", type: "debit" as const, keywords: ["test"] },
    ];

    await useTransactionStore.getState().reclassifyAll(categories);
    expect(fs.writeMonthData).toHaveBeenCalled();
    const stored = useTransactionStore.getState().months["2024-01"];
    expect(stored.transactions[0].categoryId).toBe("food");
    expect(stored.transactions[0].manual).toBe(false);
  });

  it("reclassifyAll calls onProgress callback", async () => {
    const tx: Transaction = { ...mockTx, categoryId: "old-cat" };
    useTransactionStore.setState({ months: { "2024-01": { ...mockMonth, transactions: [tx] } } });
    const categories = [
      { id: "food", name: "Food", color: "#ef4444", type: "debit" as const, keywords: ["test"] },
    ];
    const onProgress = vi.fn();

    await useTransactionStore.getState().reclassifyAll(categories, onProgress);
    expect(onProgress).toHaveBeenCalledWith(1, 1);
  });

  it("reclassifyAll handles write failure", async () => {
    const fs = await import("../../utils/fileSystem");
    const tx: Transaction = { ...mockTx, categoryId: "old-cat" };
    useTransactionStore.setState({ months: { "2024-01": { ...mockMonth, transactions: [tx] } } });
    vi.mocked(fs.writeMonthData).mockRejectedValueOnce(new Error("disk full"));

    await expect(
      useTransactionStore.getState().reclassifyAll([{ id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: ["test"] }])
    ).rejects.toThrow("disk full");
  });

  it("deleteTransaction does nothing for missing month", async () => {
    await useTransactionStore.getState().deleteTransaction(2024, 1, "1");
    expect(useTransactionStore.getState().months).toEqual({});
  });

  it("updateTransaction does nothing for unknown tx id", async () => {
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });
    await useTransactionStore.getState().updateTransaction("nonexistent", { categoryId: "other" });
    expect(useTransactionStore.getState().months["2024-01"].transactions).toHaveLength(1);
  });

  it("getLoadedMonths returns sorted keys", () => {
    useTransactionStore.setState({ months: { "2024-02": mockMonth, "2024-01": mockMonth } });
    expect(getLoadedMonths()).toEqual(["2024-01", "2024-02"]);
  });

  it("getLoadedMonths returns empty when no months", () => {
    expect(getLoadedMonths()).toEqual([]);
  });

  it("standalone loadMonthData delegates to store", () => {
    useTransactionStore.setState({ months: { "2024-01": mockMonth } });
    expect(loadMonthData(2024, 1)).toEqual(mockMonth);
    expect(loadMonthData(2024, 2)).toBeNull();
  });
});

describe("getPossibleDuplicates", () => {
  it("returns groups with multiple sources", () => {
    const tx1: Transaction = { ...mockTx, source: "csv" };
    const tx2: Transaction = { ...mockTx, id: "2", source: "manual" };
    const result = getPossibleDuplicates([tx1, tx2]);
    expect(result).toHaveLength(1);
    expect(result[0].sources).toEqual(["csv", "manual"]);
  });

  it("returns empty when no duplicates", () => {
    const tx1: Transaction = { ...mockTx, amount: 100 };
    const tx2: Transaction = { ...mockTx, id: "2", amount: 200 };
    expect(getPossibleDuplicates([tx1, tx2])).toHaveLength(0);
  });

  it("returns group sorted by key", () => {
    const tx1: Transaction = { ...mockTx, amount: 100, date: "2024-02-01" };
    const tx2: Transaction = { ...mockTx, id: "2", amount: 100, date: "2024-02-01", source: "manual" };
    const tx3: Transaction = { ...mockTx, id: "3", amount: 50, date: "2024-01-01" };
    const tx4: Transaction = { ...mockTx, id: "4", amount: 50, date: "2024-01-01", source: "manual" };
    const result = getPossibleDuplicates([tx1, tx2, tx3, tx4]);
    expect(result).toHaveLength(2);
    expect(result[0].key).toContain("2024-01-01");
  });
});

})