import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Version from "./page";

describe("página version", () => {
  it("muestra el nombre de la app, el enlace de vuelta y no aparece en el menú", () => {
    render(<Version />);

    const titulo = screen.getByRole("heading", { level: 1, name: "orq-sandbox · notas" });
    const volver = screen.getByRole("link", { name: "Volver al inicio" });
    expect(volver.getAttribute("href")).toBe("/");
    expect(titulo.compareDocumentPosition(volver) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const enlacesNavegacion = within(screen.getByRole("navigation")).getAllByRole("link");
    expect(enlacesNavegacion.some((enlace) => enlace.getAttribute("href") === "/version")).toBe(false);
  });
});
