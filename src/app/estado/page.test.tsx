import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Estado from "./page";

describe("página estado", () => {
  it("muestra el título, el estado y el enlace en la navegación", () => {
    render(<Estado />);
    expect(screen.getByRole("heading", { level: 1, name: "Estado" })).toBeDefined();
    expect(screen.getByText("Todo en orden")).toBeDefined();
    expect(screen.getByRole("link", { name: "Estado" }).getAttribute("href")).toBe("/estado");
  });
});
