export type Tema = "claro" | "oscuro";

export const CLAVE_TEMA = "tema";
export const ATRIBUTO_TEMA = "data-tema";

const TEMA_CLARO: Tema = "claro";
const TEMA_OSCURO: Tema = "oscuro";

export function esTema(valor: unknown): valor is Tema {
  return valor === TEMA_CLARO || valor === TEMA_OSCURO;
}

export function temaInicial(
  guardado: string | null,
  prefiereOscuro: boolean,
): Tema {
  return esTema(guardado)
    ? guardado
    : prefiereOscuro
      ? TEMA_OSCURO
      : TEMA_CLARO;
}

export function alternarTema(tema: Tema): Tema {
  return tema === TEMA_CLARO ? TEMA_OSCURO : TEMA_CLARO;
}

export const scriptTema = `(function(){
  try {
    var guardado = localStorage.getItem(${JSON.stringify(CLAVE_TEMA)});
    var tema = guardado === ${JSON.stringify(TEMA_CLARO)} || guardado === ${JSON.stringify(TEMA_OSCURO)}
      ? guardado
      : (!!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? ${JSON.stringify(TEMA_OSCURO)}
        : ${JSON.stringify(TEMA_CLARO)});
    document.documentElement.setAttribute(${JSON.stringify(ATRIBUTO_TEMA)}, tema);
  } catch (error) {}
})();`;
