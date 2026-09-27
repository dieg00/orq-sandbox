import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SelectorTema } from "./SelectorTema";

describe("SelectorTema", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-tema");
  });

  afterEach(cleanup);

  it("muestra Tema oscuro cuando el tema activo es claro", () => {
    render(<SelectorTema />);
    expect(screen.getByRole("button", { name: "Tema oscuro" })).toBeDefined();
  });

  it("guarda y aplica el tema oscuro al pulsar", async () => {
    render(<SelectorTema />);
    fireEvent.click(screen.getByRole("button", { name: "Tema oscuro" }));

    expect(document.documentElement.getAttribute("data-tema")).toBe("oscuro");
    expect(localStorage.getItem("tema")).toBe("oscuro");
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Tema claro" })).toBeDefined();
    });
  });

  it("vuelve al tema claro con un segundo clic", async () => {
    render(<SelectorTema />);
    fireEvent.click(screen.getByRole("button", { name: "Tema oscuro" }));
    await screen.findByRole("button", { name: "Tema claro" });
    fireEvent.click(screen.getByRole("button", { name: "Tema claro" }));

    expect(document.documentElement.getAttribute("data-tema")).toBe("claro");
    expect(localStorage.getItem("tema")).toBe("claro");
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Tema oscuro" })).toBeDefined();
    });
  });

  it("lee el tema oscuro guardado antes de renderizar", async () => {
    localStorage.setItem("tema", "oscuro");
    render(<SelectorTema />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Tema claro" })).toBeDefined();
    });
  });
});
