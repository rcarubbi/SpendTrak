import { describe, it, expect } from "vitest";
import { toastSuccess, toastError } from "../toastStore";

describe("toastSuccess", () => {
  it("calls toast.success with message and duration", async () => {
    const toast = await import("react-hot-toast");
    toastSuccess("Category created");
    expect(toast.default.success).toHaveBeenCalledWith("Category created", { duration: 4000 });
  });
});

describe("toastError", () => {
  it("calls toast.error with message when no details", async () => {
    const toast = await import("react-hot-toast");
    toastError("Something went wrong");
    expect(toast.default.error).toHaveBeenCalledWith("Something went wrong", { duration: 6000 });
  });

  it("calls toast.custom with ErrorToast when details provided", async () => {
    const toast = await import("react-hot-toast");
    toastError("Failed", "stack trace");
    expect(toast.default.custom).toHaveBeenCalledOnce();
    expect(toast.default.custom.mock.calls[0][1]).toEqual({ duration: Infinity });
  });
});
