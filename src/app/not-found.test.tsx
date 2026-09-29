import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import NoEncontrada from "./not-found";

it("muestra el 404 en español y el enlace de vuelta después del mensaje", () => {
  render(<NoEncontrada />);
  screen.getByRole("heading", { level: 1, name: "Página no encontrada" });
  const mensaje = screen.getByText("La página que buscas no existe o se ha movido.");
  const volver = screen.getByRole("link", { name: "Volver al inicio" });
  expect(volver.getAttribute("href")).toBe("/");
  expect(mensaje.compareDocumentPosition(volver) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
