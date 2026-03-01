import { useEffect, useState } from "react";
import type { IPokemonData } from "../types/pokemon.type";
import * as React from 'react';
import { Link } from "react-router-dom";

export default function BaasicPokemonList() {
  const [data, setData] = useState<IPokemonData[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("https://tyradex.app/api/v1/pokemon");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        console.error(err);
        if (mounted) setData([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemonData | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, pokemon: IPokemonData) => {
    setAnchorEl(event.currentTarget);
    setSelectedPokemon(pokemon);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPokemon(null);
  };

  const open = Boolean(anchorEl);

return (
  <div id="pokemon" style={{gap: "5px", display: "flex", flexDirection: "column", padding: "2px"}}>
    {data.map((pokemon) => (
      <Link
        key={pokemon.pokedex_id}
        to={`/pokemon/${pokemon.pokedex_id}`}
        className="pokedex-item"
      >
        <div className="pokedex-left">
          <span className="bracket-left">⟨</span>

          <div className="pokedex-circle">
          </div>

          <span className="bracket-right">⟩</span>
        </div>

        <span className="pokedex-id">
          {String(pokemon.pokedex_id).padStart(3, "0")}
        </span>

        <span className="pokedex-name">
          {pokemon.name.en}
        </span>
      </Link>
    ))}
  </div>
);
}
