// src/utils/generationBackgrounds.ts

import gen1 from "./assets/regions/kanto.png";
import gen2 from "./assets/regions/johto.jpg";
import gen3 from "./assets/regions/hoenn.png";
import gen4 from "./assets/regions/sinnoh.png";
import gen5 from "./assets/regions/unova.png";
import gen6 from "./assets/regions/kalos.png";
import gen7 from "./assets/regions/alola.png";
import gen8 from "./assets/regions/galar.png";
import gen9 from "./assets/regions/paldea.jpg";
// ajoute les autres si tu veux

export const generationBackgrounds: Record<number, string> = {
  1: gen1,
  2: gen2,
  3: gen3,
  4: gen4,
  5: gen5,
  6: gen6,
  7: gen7,
  8: gen8,
  9: gen9,
  // 5: gen5, etc.
};
