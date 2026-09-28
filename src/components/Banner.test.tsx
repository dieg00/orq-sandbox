import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Banner } from "./Banner";

describe("Banner", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    cleanup();
  });

  it("muestra el texto configurado", () => {
    vi.stubEnv("NEXT_PUBLIC_BANNER_TEXT", "Mantenimiento el viernes");
    render(<Banner />);
    expect(screen.getByRole("complementary", { name: "Aviso" }).textContent).toBe("Mantenimiento el viernes");
  });

  it("no se muestra sin la variable", () => {
    vi.stubEnv("NEXT_PUBLIC_BANNER_TEXT", undefined);
    render(<Banner />);
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("no se muestra si la variable solo tiene espacios", () => {
    vi.stubEnv("NEXT_PUBLIC_BANNER_TEXT", "   ");
    render(<Banner />);
    expect(screen.queryByRole("complementary")).toBeNull();
  });
});
