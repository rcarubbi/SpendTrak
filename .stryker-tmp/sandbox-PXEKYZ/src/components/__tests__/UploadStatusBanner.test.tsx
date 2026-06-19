// @ts-nocheck
import { render, screen } from "@testing-library/react";
import UploadStatusBanner from "../UploadStatusBanner";

describe("UploadStatusBanner", { tags: ["unit"] }, () => {
it("renders nothing when status empty", () => {
  const { container } = render(<UploadStatusBanner status="" loading={false} />);
  expect(container.firstChild).toBeNull();
});

it("renders error status", () => {
  render(<UploadStatusBanner status="Error: file too large" loading={false} />);
  expect(screen.getByText("Error: file too large")).toBeInTheDocument();
});

it("renders success status", () => {
  render(<UploadStatusBanner status="Imported 5 transactions" loading={false} />);
  expect(screen.getByText("Imported 5 transactions")).toBeInTheDocument();
});

it("renders spinner when loading", () => {
  render(<UploadStatusBanner status="Saving..." loading={true} />);
  expect(screen.getByText("Saving...")).toBeInTheDocument();
  const spinner = document.querySelector(".animate-spin");
  expect(spinner).toBeInTheDocument();
});

})