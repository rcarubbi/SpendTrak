// @ts-nocheck
import { render } from "@testing-library/react";
import {
  DashboardIcon, StatementIcon, CategoriesIcon, ClassifyIcon, UploadIcon,
  SunIcon, MoonIcon, MonitorIcon, MenuIcon, CloseIcon, SearchIcon, LogoIcon,
} from "../Icons";

const iconComponents = [
  ["DashboardIcon", DashboardIcon],
  ["StatementIcon", StatementIcon],
  ["CategoriesIcon", CategoriesIcon],
  ["ClassifyIcon", ClassifyIcon],
  ["UploadIcon", UploadIcon],
  ["SunIcon", SunIcon],
  ["MoonIcon", MoonIcon],
  ["MonitorIcon", MonitorIcon],
  ["MenuIcon", MenuIcon],
  ["CloseIcon", CloseIcon],
  ["SearchIcon", SearchIcon],
  ["LogoIcon", LogoIcon],
] as const;

it.each(iconComponents)("%s renders an SVG", (_name, Component) => {
  const { container } = render(<Component className="w-5 h-5" />);
  const svg = container.querySelector("svg");
  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute("viewBox");
});
