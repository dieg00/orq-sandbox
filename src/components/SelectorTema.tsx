"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import {
  alternarTema,
  ATRIBUTO_TEMA,
  CLAVE_TEMA,
  esTema,
  temaInicial,
  type Tema,
} from "@/lib/tema";

function suscribirAlTema(notificar: () => void) {
  const observador = new MutationObserver(notificar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [ATRIBUTO_TEMA],
  });
  return () => observador.disconnect();
}

function obtenerTema(): Tema {
  const valor = document.documentElement.getAttribute(ATRIBUTO_TEMA);
  return esTema(valor) ? valor : "claro";
}

function obtenerTemaServidor(): Tema {
  return "claro";
}

function cambiarTema(actual: Tema) {
  const siguiente = alternarTema(actual);
  try {
    localStorage.setItem(CLAVE_TEMA, siguiente);
  } catch {
    // El tema cambia igualmente si el almacenamiento no está disponible.
  }
  document.documentElement.setAttribute(ATRIBUTO_TEMA, siguiente);
}

export function SelectorTema() {
  const actual = useSyncExternalStore(
    suscribirAlTema,
    obtenerTema,
    obtenerTemaServidor,
  );

  useLayoutEffect(() => {
    const prefiereOscuro =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(CLAVE_TEMA);
    } catch {
      // Se aplica la preferencia del sistema si no se puede leer el almacenamiento.
    }
    document.documentElement.setAttribute(
      ATRIBUTO_TEMA,
      temaInicial(guardado, prefiereOscuro),
    );
  }, []);

  return (
    <button
      type="button"
      className="text-sm font-medium"
      onClick={() => cambiarTema(actual)}
    >
      {actual === "claro" ? "Tema oscuro" : "Tema claro"}
    </button>
  );
}
