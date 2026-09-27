import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AcercaDe from "./page";

describe("página acerca de", () => {
  it("muestra el título, la descripción y el enlace en la navegación", () => {
    render(<AcercaDe />);
    expect(screen.getByRole("heading", { level: 1, name: "Acerca de" })).toBeDefined();
    expect(screen.getByText(/repo de testeo del orquestador/i)).toBeDefined();
    expect(screen.getByRole("link", { name: "Acerca de" }).getAttribute("href")).toBe("/about");
  });
});
