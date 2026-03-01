import "../index.css";
import "../App.css";

import PokemonList from "../components/BaasicPokemonList";
import PokemonDetailedView from "../components/PokemonDetailedView";
import { useParams } from "react-router-dom";

export default function RootLayout() {
  const { pokeId } = useParams();

  return (
    <div id="pokedex" style={{overflow: "hidden" }}>

      {/* GAUCHE = DETAILS (fixe) */}
      <div
        id="pokeinfo"
        style={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        {pokeId ? <PokemonDetailedView /> : <p>Sélectionne un Pokémon →</p>}
      </div>

      {/* DROITE = LISTE (scroll indépendant) */}
      <div
        id="pokelist"
        style={{
          height: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <PokemonList />
      </div>

    </div>
  );
}