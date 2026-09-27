import { describe, expect, it } from "vitest";
import { fijadasPrimero, ordenarPorFecha, resumir, sinArchivadas, textoContador, type Nota } from "./notas";

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
    { id: 2, titulo: "intermedia", creadaEn: "2026-03-01T00:00:00Z", actualizadaEn: "2026-03-01T00:00:00Z", archivada: false, fijada: false },
    { id: 3, titulo: "nueva", creadaEn: "2026-06-01T00:00:00Z", actualizadaEn: "2026-06-01T00:00:00Z", archivada: false, fijada: false },
    { id: 1, titulo: "vieja", creadaEn: "2026-01-01T00:00:00Z", actualizadaEn: "2026-01-01T00:00:00Z", archivada: false, fijada: false },
  ];

  it("pone primero la nota más reciente sin mutar la entrada", () => {
    const notasPorDefecto: Nota[] = [
      { id: 1, titulo: "vieja", creadaEn: "2026-01-01T00:00:00Z", actualizadaEn: "2026-01-01T00:00:00Z", archivada: false, fijada: false },
      { id: 2, titulo: "nueva", creadaEn: "2026-06-01T00:00:00Z", actualizadaEn: "2026-06-01T00:00:00Z", archivada: false, fijada: false },
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

describe("fijadasPrimero", () => {
  const notas: Nota[] = [
    { id: 1, titulo: "primera", creadaEn: "2026-01-01T00:00:00Z", actualizadaEn: "2026-01-01T00:00:00Z", archivada: false, fijada: false },
    { id: 2, titulo: "segunda", creadaEn: "2026-02-01T00:00:00Z", actualizadaEn: "2026-02-01T00:00:00Z", archivada: false, fijada: true },
    { id: 3, titulo: "tercera", creadaEn: "2026-03-01T00:00:00Z", actualizadaEn: "2026-03-01T00:00:00Z", archivada: false, fijada: false },
    { id: 4, titulo: "cuarta", creadaEn: "2026-04-01T00:00:00Z", actualizadaEn: "2026-04-01T00:00:00Z", archivada: false, fijada: true },
  ];

  it("pone las fijadas primero y conserva el orden relativo de ambos grupos", () => {
    expect(fijadasPrimero(notas).map((nota) => nota.id)).toEqual([2, 4, 1, 3]);
  });

  it("devuelve un array nuevo sin mutar la entrada", () => {
    const entrada = [...notas];
    const idsOriginales = entrada.map((nota) => nota.id);

    expect(fijadasPrimero(entrada)).not.toBe(entrada);
    expect(entrada.map((nota) => nota.id)).toEqual(idsOriginales);
  });

  it("conserva el orden si no hay notas fijadas", () => {
    const sinFijadas: Nota[] = [
      { id: 3, titulo: "tercera", creadaEn: "2026-03-01T00:00:00Z", actualizadaEn: "2026-03-01T00:00:00Z", archivada: false, fijada: false },
      { id: 1, titulo: "primera", creadaEn: "2026-01-01T00:00:00Z", actualizadaEn: "2026-01-01T00:00:00Z", archivada: false, fijada: false },
      { id: 2, titulo: "segunda", creadaEn: "2026-02-01T00:00:00Z", actualizadaEn: "2026-02-01T00:00:00Z", archivada: false, fijada: false },
    ];

    expect(fijadasPrimero(sinFijadas).map((nota) => nota.id)).toEqual([3, 1, 2]);
  });

  it("mantiene cada grupo ordenado por fecha ascendente al componerse", () => {
    const entrada: Nota[] = [
      { id: 2, titulo: "segunda", creadaEn: "2026-02-01T00:00:00Z", actualizadaEn: "2026-02-01T00:00:00Z", archivada: false, fijada: false },
      { id: 3, titulo: "tercera", creadaEn: "2026-03-01T00:00:00Z", actualizadaEn: "2026-03-01T00:00:00Z", archivada: false, fijada: true },
      { id: 1, titulo: "primera", creadaEn: "2026-01-01T00:00:00Z", actualizadaEn: "2026-01-01T00:00:00Z", archivada: false, fijada: true },
      { id: 4, titulo: "cuarta", creadaEn: "2026-04-01T00:00:00Z", actualizadaEn: "2026-04-01T00:00:00Z", archivada: false, fijada: false },
    ];

    expect(fijadasPrimero(ordenarPorFecha(entrada, "ascendente")).map((nota) => nota.id)).toEqual([1, 3, 2, 4]);
  });
});

describe("sinArchivadas", () => {
  it("excluye las archivadas y conserva el orden de las demás", () => {
    const notas: Nota[] = [
      { id: 1, titulo: "primera", creadaEn: "2026-01-01T00:00:00Z", actualizadaEn: "2026-01-01T00:00:00Z", archivada: false, fijada: false },
      { id: 2, titulo: "archivada", creadaEn: "2026-02-01T00:00:00Z", actualizadaEn: "2026-02-01T00:00:00Z", archivada: true, fijada: false },
      { id: 3, titulo: "última", creadaEn: "2026-03-01T00:00:00Z", actualizadaEn: "2026-03-01T00:00:00Z", archivada: false, fijada: false },
    ];

    expect(sinArchivadas(notas).map((nota) => nota.id)).toEqual([1, 3]);
  });

  it("devuelve un array nuevo sin mutar la entrada", () => {
    const notas: Nota[] = [
      { id: 1, titulo: "primera", creadaEn: "2026-01-01T00:00:00Z", actualizadaEn: "2026-01-01T00:00:00Z", archivada: false, fijada: false },
      { id: 2, titulo: "archivada", creadaEn: "2026-02-01T00:00:00Z", actualizadaEn: "2026-02-01T00:00:00Z", archivada: true, fijada: false },
    ];
    const originales = [...notas];

    const resultado = sinArchivadas(notas);

    expect(resultado).not.toBe(notas);
    expect(notas).toEqual(originales);
  });
});

describe("textoContador", () => {
  it("usa el plural para cero", () => {
    expect(textoContador(0)).toBe("0 notas");
  });

  it("usa el singular para una nota", () => {
    expect(textoContador(1)).toBe("1 nota");
  });

  it("usa el plural a partir de dos notas", () => {
    expect(textoContador(2)).toBe("2 notas");
  });

  it("usa el plural para varias notas", () => {
    expect(textoContador(5)).toBe("5 notas");
  });
});
