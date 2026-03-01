import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IPokemonData } from "../types/pokemon.type.ts";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://tyradex.app/api/v1/" }),
  tagTypes: ["PokemonGen"],
  endpoints: (builder) => ({
    // 1) Récupérer une génération complète
    getGen: builder.query<IPokemonData[], number | void>({
      query: (gen = 1) => `gen/${gen}`,
      providesTags: () => ["PokemonGen"],
    }),

    // 2) Récupérer un Pokémon par id
    getPokemon: builder.query<IPokemonData, number>({
      query: (id) => `pokemon/${id}`,
    }),

    // 3) Exemple de mutation (POST)
    fakeApiPost: builder.mutation<number, number>({
      query: (id) => ({
        url: `pokemon/${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["PokemonGen"],
    }),
  }),
});

export const {
  useGetGenQuery,
  useGetPokemonQuery,
  useFakeApiPostMutation,
} = pokemonApi;