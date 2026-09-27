import { describe, expect, it } from "vitest";
import { formatearFecha } from "./fechas";

describe("formatearFecha", () => {
  it("formatea una fecha normal", () => {
    expect(formatearFecha("2026-11-23T10:00:00Z")).toBe("23/11/2026");
  });

  it("rellena un día de un dígito", () => {
    expect(formatearFecha("2026-12-05T12:00:00Z")).toBe("05/12/2026");
  });

  it("rellena un mes de un dígito", () => {
    expect(formatearFecha("2026-03-15T12:00:00Z")).toBe("15/03/2026");
  });

  it("rellena día y mes de un dígito", () => {
    expect(formatearFecha("2026-01-02T00:00:00Z")).toBe("02/01/2026");
  });

  it("aplica UTC al cambiar de día", () => {
    expect(formatearFecha("2026-06-01T23:30:00-05:00")).toBe("02/06/2026");
  });

  it("rechaza una fecha inválida", () => {
    expect(() => formatearFecha("no es fecha")).toThrow(RangeError);
  });
});
