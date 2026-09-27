import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Cabecera } from "./Cabecera";

describe("Cabecera", () => {
  afterEach(() => {
    cleanup();
  });

  it("muestra GitHub al final de la navegación como enlace externo", () => {
    render(<Cabecera />);

    const enlaceGitHub = screen.getByRole("link", { name: "GitHub" });
    expect(enlaceGitHub.getAttribute("href")).toBe(
      "https://github.com/dieg00/orq-sandbox",
    );
    expect(enlaceGitHub.getAttribute("target")).toBe("_blank");
    expect(enlaceGitHub.getAttribute("rel")).toBe("noopener noreferrer");

    const enlacesNavegacion = within(
      screen.getByRole("navigation"),
    ).getAllByRole("link");
    expect(enlacesNavegacion.at(-1)?.textContent).toBe("GitHub");
  });

  it("muestra el nombre del sitio antes de la navegación", () => {
    render(<Cabecera />);

    const enlace = screen.getByRole("link", { name: "orq-sandbox" });
    const cabecera = screen.getByRole("banner");
    const navegacion = screen.getByRole("navigation");

    expect(enlace.getAttribute("href")).toBe("/");
    expect(enlace.classList.contains("font-bold")).toBe(true);
    expect(cabecera.classList.contains("flex")).toBe(true);
    expect(cabecera.classList.contains("justify-between")).toBe(true);
    expect(navegacion.contains(enlace)).toBe(false);
    expect(Boolean(enlace.compareDocumentPosition(navegacion) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(within(navegacion).getByRole("link", { name: "Inicio" })).toBeDefined();
    expect(within(navegacion).getByRole("link", { name: "Acerca de" })).toBeDefined();
  });
});
