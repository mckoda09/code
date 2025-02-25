import { writable } from "svelte/store";

const createLinesCounter = () => {
  const localCounter = localStorage.getItem("linesCounter");
  const { subscribe, update } = writable(
    localCounter ? Number(localCounter) : 0
  );
  subscribe((v) => localStorage.setItem("linesCounter", v.toString()));
  return {
    subscribe,
    increase: () => {
      update((v) => v + 1);
    },
  };
};

const createSymbolsCounter = () => {
  const localCounter = localStorage.getItem("symbolsCounter");
  const { subscribe, update } = writable(
    localCounter ? Number(localCounter) : 0
  );
  subscribe((v) => localStorage.setItem("symbolsCounter", v.toString()));
  return {
    subscribe,
    increase: (by: number) => {
      update((v) => v + by);
    },
  };
};

export const linesCounter = createLinesCounter();
export const symbolsCounter = createSymbolsCounter();
