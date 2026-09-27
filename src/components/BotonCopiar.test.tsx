import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BotonCopiar } from "./BotonCopiar";

describe("BotonCopiar", () => {
  afterEach(() => {
    vi.useRealTimers();
    cleanup();
    vi.restoreAllMocks();
  });

  it("copia el texto completo y muestra el aviso durante dos segundos", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<BotonCopiar texto="Texto de prueba" />);
    const boton = screen.getByRole("button", { name: "Copiar nota: Texto de prueba" });
    expect(boton.textContent).toBe("Copiar");

    await act(async () => { fireEvent.click(boton); });
    expect(writeText).toHaveBeenCalledWith("Texto de prueba");
    expect(boton.textContent).toBe("Copiado");
    expect(screen.getByRole("button", { name: "Copiar nota: Texto de prueba" })).toBeDefined();

    act(() => { vi.advanceTimersByTime(1999); });
    expect(boton.textContent).toBe("Copiado");
    act(() => { vi.advanceTimersByTime(1); });
    expect(boton.textContent).toBe("Copiar");
  });

  it("no muestra el aviso si falla la copia", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denegado"));
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<BotonCopiar texto="Texto de prueba" />);
    const boton = screen.getByRole("button", { name: "Copiar nota: Texto de prueba" });
    expect(boton.textContent).toBe("Copiar");

    await act(async () => { fireEvent.click(boton); });
    expect(writeText).toHaveBeenCalledWith("Texto de prueba");
    expect(boton.textContent).toBe("Copiar");
  });

  it("no lanza errores cuando no hay portapapeles", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });

    render(<BotonCopiar texto="Texto de prueba" />);
    const boton = screen.getByRole("button", { name: "Copiar nota: Texto de prueba" });
    expect(boton.textContent).toBe("Copiar");

    await act(async () => { fireEvent.click(boton); });
    expect(boton.textContent).toBe("Copiar");
  });
});
