import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VolverInicio } from "./VolverInicio";

describe("VolverInicio", () => {
  it("enlaza al inicio", () => {
    render(<VolverInicio />);
    const enlace = screen.getByRole("link", { name: "Volver al inicio" });
    expect(enlace.getAttribute("href")).toBe("/");
  });
});
