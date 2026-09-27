import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "./page";

describe("página de inicio", () => {
  afterEach(cleanup);

  it("muestra las notas sin archivar, la más antigua primero", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Notas" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Tema oscuro" })).toBeDefined();
    const elementos = screen.getAllByRole("listitem");
    const items = elementos.map((li) => li.querySelector("span")?.textContent);
    expect(items).toEqual(["Primera nota del sandbox", "Repo de testeo del orquestador"]);
    elementos.forEach((li) => {
      expect(within(li).getAllByRole("button").length).toBe(1);
    });
    expect(screen.getByRole("button", { name: "Copiar nota: Primera nota del sandbox" })).toBeDefined();
    expect(screen.queryByText("Nota archivada de ejemplo")).toBeNull();
  });

  it("muestra el contador de notas sin archivar encima de la lista", () => {
    render(<Home />);
    const contador = screen.getByText("2 notas");
    expect(
      contador.compareDocumentPosition(screen.getByRole("list")) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });
});
