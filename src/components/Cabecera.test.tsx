import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Cabecera } from "./Cabecera";

describe("Cabecera", () => {
  afterEach(() => {
    cleanup();
  });

  it("muestra GitHub al final de la navegación como enlace externo", () => {
    render(<Cabecera />);

    const enlaceGitHub = screen.getByRole("link", { name: "GitHub" });
    expect(enlaceGitHub.getAttribute("href")).toBe(
      "https://github.com/dieg00/orq-sandbox",
    );
    expect(enlaceGitHub.getAttribute("target")).toBe("_blank");
    expect(enlaceGitHub.getAttribute("rel")).toBe("noopener noreferrer");

    const enlacesNavegacion = within(
      screen.getByRole("navigation"),
    ).getAllByRole("link");
    expect(enlacesNavegacion.at(-1)?.textContent).toBe("GitHub");
  });
});
