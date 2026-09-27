import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("página de inicio", () => {
  it("muestra las notas sin archivar, la más antigua primero", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Notas" })).toBeDefined();
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toEqual(["Primera nota del sandbox", "Repo de testeo del orquestador"]);
    expect(screen.queryByText("Nota archivada de ejemplo")).toBeNull();
  });
});
