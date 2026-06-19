import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmModal from "../ConfirmModal";

const defaultProps = {
  show: true,
  title: "Delete?",
  message: "Are you sure?",
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

describe("ConfirmModal", { tags: ["unit"] }, () => {
it("renders nothing when show is false", () => {
  const { container } = render(<ConfirmModal {...defaultProps} show={false} />);
  expect(container.firstChild).toBeNull();
});

it("renders title and message", () => {
  render(<ConfirmModal {...defaultProps} />);
  expect(screen.getByText("Delete?")).toBeInTheDocument();
  expect(screen.getByText("Are you sure?")).toBeInTheDocument();
});

it("calls onConfirm when confirm clicked", async () => {
  const onConfirm = vi.fn();
  const user = userEvent.setup();
  render(<ConfirmModal {...defaultProps} onConfirm={onConfirm} />);
  await user.click(screen.getByText("Confirm"));
  expect(onConfirm).toHaveBeenCalledOnce();
});

it("calls onCancel when cancel clicked", async () => {
  const onCancel = vi.fn();
  const user = userEvent.setup();
  render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);
  await user.click(screen.getByText("Cancel"));
  expect(onCancel).toHaveBeenCalledOnce();
});

it("calls onCancel when backdrop clicked", async () => {
  const onCancel = vi.fn();
  const user = userEvent.setup();
  render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);
  const backdrop = screen.getByText("Delete?").closest(".fixed");
  await user.click(backdrop!);
  expect(onCancel).toHaveBeenCalledOnce();
});

it("does not call onCancel when modal content clicked", async () => {
  const onCancel = vi.fn();
  const user = userEvent.setup();
  render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);
  const modalContent = screen.getByText("Are you sure?").closest(".max-w-md");
  await user.click(modalContent!);
  expect(onCancel).not.toHaveBeenCalled();
});

it("uses custom confirm label", () => {
  render(<ConfirmModal {...defaultProps} confirmLabel="Yes, delete" />);
  expect(screen.getByText("Yes, delete")).toBeInTheDocument();
});

})