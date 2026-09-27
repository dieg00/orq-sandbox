import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Estado from "./page";

describe("página estado", () => {
  it("muestra el título, el estado, el enlace de vuelta y el enlace en la navegación", () => {
    render(<Estado />);
    expect(screen.getByRole("heading", { level: 1, name: "Estado" })).toBeDefined();
    const estado = screen.getByText("Todo en orden");
    const volver = screen.getByRole("link", { name: "Volver al inicio" });
    expect(volver.getAttribute("href")).toBe("/");
    expect(estado.compareDocumentPosition(volver) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("link", { name: "Estado" }).getAttribute("href")).toBe("/estado");
  });
});
