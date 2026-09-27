import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("página de inicio", () => {
  it("muestra las notas sin archivar, la más reciente primero", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Notas" })).toBeDefined();
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toEqual(["Repo de testeo del orquestador", "Primera nota del sandbox"]);
    expect(screen.queryByText("Nota archivada de ejemplo")).toBeNull();
  });
});
