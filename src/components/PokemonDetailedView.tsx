import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generationBackgrounds } from "./Generation";


interface PokemonData {
  pokedex_id: number;
  name: {
    en: string;
    fr: string;
  };
  sprites: {
    regular: string;
    shiny: string;
  };
  types: {
    name: string;
  }[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  height: number;
  weight: number;
  talents: {
    name: string;
    tc: boolean;
  }[];
  generation: number;
}

export default function PokemonDetailedView() {
  const { pokeId } = useParams();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState<"normal" | "alternate" | "mega">("normal");
  const [formIndex, setFormIndex] = useState(0);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    if (!pokeId) return;

    (async () => {
      try {
        const res = await fetch(`https://tyradex.app/api/v1/pokemon/${pokeId}`);

        if (!res.ok) {
          setPokemon(null);
          return;
        }

        const data: PokemonData = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error(err);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [pokeId]);

  if (loading) return <p>Chargement...</p>;
  if (!pokemon) return <p>Pokémon introuvable.</p>;

  const background = generationBackgrounds[pokemon.generation];

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <p id="popemon">{pokemon.name.en}</p>

      <button
        onClick={() => setIsShiny(!isShiny)}
        style={{
          padding: "6px 12px",
          marginBottom: "10px",
          cursor: "pointer",
          borderRadius: "100%",
          background: isShiny ? "#ff0000" : "#000000",
          color: "white",
          border: "1px solid #888",
        }}
      >
        {isShiny ? "★" : "★"}
      </button>

      <div
        id="pokedetails"
        className="pokedetails"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >


        <img
          src={isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular}
          width="150"
        />
      </div>


      <div className="pokemon-grid">
        <p id="popemon">Types</p>
        <ul id="popemon" style={{ listStyle: "none", fontSize: "12px" }}>
          {pokemon.types?.map((t) => (
            <li key={t.name}>{t.name}</li>
          ))}
        </ul>

        <p id="popemon">Stats</p>
        <ul id="popemon" style={{ listStyle: "none", fontSize: "12px" }}>
          <li>HP : {pokemon.stats?.hp ?? "?"}</li>
          <li>Attack : {pokemon.stats?.atk ?? "?"}</li>
          <li>Defense : {pokemon.stats?.def ?? "?"}</li>
          <li>Att. Spé : {pokemon.stats?.spe_atk ?? "?"}</li>
          <li>Def. Spé : {pokemon.stats?.spe_def ?? "?"}</li>
          <li>Vitesse : {pokemon.stats?.vit ?? "?"}</li>
        </ul>
      </div>
    </div>
  );
}
