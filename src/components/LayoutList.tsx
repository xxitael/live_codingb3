import { Outlet } from "react-router-dom";
import PokemonList from "./BaasicPokemonList";

export default function LayoutAvecListe() {
  return (
    <div id='pokedex'>
      <div id='pokeinfo' style={{ flex: '1 1', overflowY: 'hidden' }}>
        <Outlet />
      </div>


      <div className="pokemon-list pokedex-list">
        <PokemonList />
      </div>
    </div>
  );
}