import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

describe("página de inicio", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    cleanup();
  });

  it("muestra las notas sin archivar, con las fijadas primero", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Notas" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Tema oscuro" })).toBeDefined();
    const elementos = screen.getAllByRole("listitem");
    const items = elementos.map((li) => li.querySelector("span")?.textContent);
    expect(items).toEqual(["Repo de testeo del orquestador", "Primera nota del sandbox"]);
    elementos.forEach((li) => {
      expect(within(li).getAllByRole("button").length).toBe(1);
    });
    expect(screen.getByRole("button", { name: "Copiar nota: Primera nota del sandbox" })).toBeDefined();
    expect(screen.queryByText("Nota archivada de ejemplo")).toBeNull();
  });

  it("muestra el contador de notas sin archivar encima de la lista", () => {
    render(<Home />);
    const lista = screen.getByRole("list");
    const contador = screen.getByText("2 notas");
    expect(contador).toBeDefined();
    expect(
      contador.compareDocumentPosition(lista) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(lista.getAttribute("aria-describedby")).toBe(contador.id);
    expect(contador.id).toBe("contador-notas");
    expect(within(lista).getAllByRole("listitem").length).toBe(2);
  });

  it("enlaza los títulos visibles a sus detalles", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Primera nota del sandbox" }).getAttribute("href")).toBe("/notas/1");
    expect(screen.getByRole("link", { name: "Repo de testeo del orquestador" }).getAttribute("href")).toBe("/notas/2");
    expect(screen.queryByRole("link", { name: "Nota archivada de ejemplo" })).toBeNull();
  });

  it("muestra el banner antes del título de la portada", () => {
    vi.stubEnv("NEXT_PUBLIC_BANNER_TEXT", "Aviso de prueba");
    render(<Home />);
    const banner = screen.getByRole("complementary", { name: "Aviso" });
    const titulo = screen.getByRole("heading", { name: "Notas" });
    expect(banner.textContent).toBe("Aviso de prueba");
    expect(banner.compareDocumentPosition(titulo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
