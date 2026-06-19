// @ts-nocheck
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-hot-toast", async () => {
  const React = await import("react");
  const { render: rtlRender } = await import("@testing-library/react");

  return {
    default: {
      success: vi.fn(),
      error: vi.fn(),
      custom: vi.fn().mockImplementation((fn) => {
        const el = fn({ id: "integration-test-toast" });
        const container = document.createElement("div");
        container.id = "toast-root";
        document.body.appendChild(container);
        rtlRender(el, { container });
        return "integration-test-toast";
      }),
      dismiss: vi.fn(),
    },
    Toaster: () => React.createElement("div", { "data-testid": "toaster" }),
  };
});

describe("toastStore.integration", { tags: ["integration"] }, () => {
afterEach(() => {
  const root = document.getElementById("toast-root");
  if (root) root.remove();
});

describe("toastError integration", () => {
  it("renders ErrorToast with message and details when details provided", async () => {
    const { toastError } = await import("../toastStore");

    toastError("Operation failed", "Error: disk full\n  at write (src/store.ts:42)");

    const msg = screen.getByText("Operation failed");
    expect(msg).toBeInTheDocument();

    const detailsBtn = screen.getByText("Details");
    expect(detailsBtn).toBeInTheDocument();
  });

  it("toggles detail visibility on click", async () => {
    const { toastError } = await import("../toastStore");
    const user = userEvent.setup();

    toastError("Failed", "Error details here");

    const detailsBtn = screen.getByText("Details");
    await user.click(detailsBtn);

    expect(screen.getByText("Hide details")).toBeInTheDocument();
    expect(screen.getByText("Error details here")).toBeInTheDocument();

    await user.click(screen.getByText("Hide details"));
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.queryByText("Error details here")).not.toBeInTheDocument();
  });

  it("dismisses toast when dismiss button clicked", async () => {
    const { toastError } = await import("../toastStore");
    const user = userEvent.setup();
    const toast = await import("react-hot-toast");

    toastError("Dismiss me", "some trace");

    const dismissBtn = screen.getByLabelText("Dismiss");
    await user.click(dismissBtn);

    expect(toast.default.dismiss).toHaveBeenCalledWith("integration-test-toast");
  });

  it("has dismiss button", async () => {
    const { toastError } = await import("../toastStore");
    toastError("Err", "trace");

    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
  });
});

})