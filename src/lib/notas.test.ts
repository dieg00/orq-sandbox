import { describe, expect, it } from "vitest";
import { ordenarPorFecha, resumir } from "./notas";

describe("resumir", () => {
  it("deja intacto un texto corto", () => {
    expect(resumir("hola  mundo ")).toBe("hola mundo");
  });

  it("recorta un texto largo con elipsis", () => {
    const resultado = resumir("una nota bastante larga para recortar", 12);
    expect(resultado).toBe("una nota ba…");
    expect(resultado.length).toBeLessThanOrEqual(12);
  });
});

describe("ordenarPorFecha", () => {
  it("pone primero la nota más reciente sin mutar la entrada", () => {
    const notas = [
      { id: 1, titulo: "vieja", creadaEn: "2026-01-01T00:00:00Z" },
      { id: 2, titulo: "nueva", creadaEn: "2026-06-01T00:00:00Z" },
    ];
    expect(ordenarPorFecha(notas).map((n) => n.id)).toEqual([2, 1]);
    expect(notas[0]?.id).toBe(1);
  });
});
