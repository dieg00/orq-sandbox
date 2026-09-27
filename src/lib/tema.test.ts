import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  alternarTema,
  esTema,
  scriptTema,
  temaInicial,
} from "./tema";

describe("esTema", () => {
  it("acepta solo los temas válidos", () => {
    expect(esTema("claro")).toBe(true);
    expect(esTema("oscuro")).toBe(true);
    expect(esTema("otro")).toBe(false);
    expect(esTema(0)).toBe(false);
    expect(esTema(null)).toBe(false);
  });
});

describe("temaInicial", () => {
  it("respeta el tema guardado con cualquier preferencia del sistema", () => {
    expect(temaInicial("claro", false)).toBe("claro");
    expect(temaInicial("claro", true)).toBe("claro");
    expect(temaInicial("oscuro", false)).toBe("oscuro");
    expect(temaInicial("oscuro", true)).toBe("oscuro");
  });

  it("usa la preferencia del sistema si no hay un tema válido", () => {
    expect(temaInicial(null, false)).toBe("claro");
    expect(temaInicial(null, true)).toBe("oscuro");
    expect(temaInicial("basura", false)).toBe("claro");
    expect(temaInicial("basura", true)).toBe("oscuro");
  });
});

describe("alternarTema", () => {
  it("alterna en ambas direcciones", () => {
    expect(alternarTema("claro")).toBe("oscuro");
    expect(alternarTema("oscuro")).toBe("claro");
  });
});

describe("scriptTema", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-tema");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("aplica el tema guardado", () => {
    localStorage.setItem("tema", "oscuro");
    new Function(scriptTema)();
    expect(document.documentElement.getAttribute("data-tema")).toBe("oscuro");
  });

  it("usa claro sin tema guardado ni matchMedia", () => {
    new Function(scriptTema)();
    expect(document.documentElement.getAttribute("data-tema")).toBe("claro");
  });

  it("sigue la preferencia oscura del sistema", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
    new Function(scriptTema)();
    expect(document.documentElement.getAttribute("data-tema")).toBe("oscuro");
  });
});
