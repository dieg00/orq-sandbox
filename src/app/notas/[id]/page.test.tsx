import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import NotaPage, { generateMetadata, generateStaticParams } from "./page";

describe("página de detalle de nota", () => {
  afterEach(cleanup);

  it("muestra el título completo, la marca, las fechas y las acciones de la nota fijada", async () => {
    render(await NotaPage({ params: Promise.resolve({ id: "2" }) }));

    screen.getByRole("heading", { level: 1, name: "Repo de testeo del orquestador" });
    screen.getByText("Fijada");
    const creada = screen.getByText("Creada");
    const actualizada = screen.getByText("Actualizada");
    expect(creada.nextElementSibling?.querySelector("time")?.textContent).toBe("20/09/2026");
    expect(actualizada.nextElementSibling?.querySelector("time")?.textContent).toBe("20/09/2026");
    screen.getByRole("button", { name: "Copiar nota: Repo de testeo del orquestador" });

    const fechas = creada.closest("dl");
    const volver = screen.getByRole("link", { name: "Volver al inicio" });
    expect((fechas?.compareDocumentPosition(volver) ?? 0) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("omite la marca en una nota sin fijar", async () => {
    render(await NotaPage({ params: Promise.resolve({ id: "1" }) }));
    expect(screen.queryByText("Fijada")).toBeNull();
  });

  it.each(["3", "99", "01"])("devuelve 404 para el id %s", async (id) => {
    await expect(NotaPage({ params: Promise.resolve({ id }) })).rejects.toMatchObject({
      digest: "NEXT_HTTP_ERROR_FALLBACK;404",
    });
  });

  it("genera solo las rutas de las notas sin archivar", () => {
    expect(generateStaticParams()).toEqual([{ id: "1" }, { id: "2" }]);
  });

  it("devuelve solo el título de la nota como metadata", async () => {
    expect(await generateMetadata({ params: Promise.resolve({ id: "1" }) })).toEqual({
      title: "Primera nota del sandbox",
    });
  });

  it.each(["3", "99"])("no devuelve título para el id %s", async (id) => {
    expect(await generateMetadata({ params: Promise.resolve({ id }) })).toEqual({});
  });
});
