export interface IEvolutionNode {
  pokedex_id: number;
  name: string;
  condition?: string | null;
}

export interface IType {
  name: string;
  image: string;
}

export interface ITalent {
  name: string;
  tc: boolean;
}

export interface IStats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
  [key: string]: number;
}

export interface IResistance {
  name: string;
  multiplier: number;
}

export interface ISprites {
 regular: string;
  shiny: string;

  // Méga évolutions
  mega?: {
    regular: string;
    shiny: string;
    name: string;
  }[];
  // Formes alternatives
  alternate?: {
    regular: string;
    shiny: string;
    name: string;
  }[];
};


export interface IPokemonNames {
  fr?: string;
  en?: string;
  jp?: string;
  [locale: string]: string | undefined;
}

export interface IPokemonData {
  pokedex_id: number;
  name: { en: string; fr: string };
  sprites: {
    regular: string;
    shiny: string;
    gmax?: string;
    mega?: string[];
    form?: string[];
  };
  types: { name: string }[];
  stats: { hp: number; atk: number; def: number; spe_atk: number; spe_def: number; vit: number };
  height: number;
  weight: number;
  talents: { name: string; tc: boolean }[];
  generation: number;
}

