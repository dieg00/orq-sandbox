import { describe, expect, it } from "vitest";
import { ordenarPorFecha, resumir, sinArchivadas, type Nota } from "./notas";

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
  const notas: Nota[] = [
    { id: 2, titulo: "intermedia", creadaEn: "2026-03-01T00:00:00Z", archivada: false },
    { id: 3, titulo: "nueva", creadaEn: "2026-06-01T00:00:00Z", archivada: false },
    { id: 1, titulo: "vieja", creadaEn: "2026-01-01T00:00:00Z", archivada: false },
  ];

  it("pone primero la nota más reciente sin mutar la entrada", () => {
    const notasPorDefecto: Nota[] = [
      { id: 1, titulo: "vieja", creadaEn: "2026-01-01T00:00:00Z", archivada: false },
      { id: 2, titulo: "nueva", creadaEn: "2026-06-01T00:00:00Z", archivada: false },
    ];
    expect(ordenarPorFecha(notasPorDefecto).map((n) => n.id)).toEqual([2, 1]);
    expect(notasPorDefecto[0]?.id).toBe(1);
  });

  it("ordena de forma descendente cuando se pide explícitamente", () => {
    expect(ordenarPorFecha(notas, "descendente").map((nota) => nota.id)).toEqual([3, 2, 1]);
  });

  it("ordena de forma ascendente sin mutar la entrada", () => {
    expect(ordenarPorFecha(notas, "ascendente").map((nota) => nota.id)).toEqual([1, 2, 3]);
    expect(notas.map((nota) => nota.id)).toEqual([2, 3, 1]);
  });
});

describe("sinArchivadas", () => {
  it("excluye las archivadas y conserva el orden de las demás", () => {
    const notas: Nota[] = [
      { id: 1, titulo: "primera", creadaEn: "2026-01-01T00:00:00Z", archivada: false },
      { id: 2, titulo: "archivada", creadaEn: "2026-02-01T00:00:00Z", archivada: true },
      { id: 3, titulo: "última", creadaEn: "2026-03-01T00:00:00Z", archivada: false },
    ];

    expect(sinArchivadas(notas).map((nota) => nota.id)).toEqual([1, 3]);
  });

  it("devuelve un array nuevo sin mutar la entrada", () => {
    const notas: Nota[] = [
      { id: 1, titulo: "primera", creadaEn: "2026-01-01T00:00:00Z", archivada: false },
      { id: 2, titulo: "archivada", creadaEn: "2026-02-01T00:00:00Z", archivada: true },
    ];
    const originales = [...notas];

    const resultado = sinArchivadas(notas);

    expect(resultado).not.toBe(notas);
    expect(notas).toEqual(originales);
  });
});
