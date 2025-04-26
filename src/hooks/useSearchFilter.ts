import { useState, useEffect, useCallback } from "react";
import { Pokemon } from "../../types/pokemon";

export function useSearchFilter(initialSearchTerm: string, initialPokemonList: Pokemon[]) {
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(initialPokemonList);
  const [currentSearchTerm, setCurrentSearchTerm] = useState(initialSearchTerm);

  const handleSearch = useCallback((term?: string, pokemonList?: Pokemon[]) => {
    const search = term !== undefined ? term : currentSearchTerm;
    const list = pokemonList !== undefined ? pokemonList : initialPokemonList;

    if (search.trim() === "") {
      setFilteredPokemon(list);
    } else {
      const filtered = list.filter((poke) =>
        poke.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }

    setCurrentSearchTerm(search);
  },[currentSearchTerm, initialPokemonList]);

  useEffect(() => {
    handleSearch(currentSearchTerm, initialPokemonList);
  }, [initialPokemonList, currentSearchTerm, handleSearch]);

  return { filteredPokemon, handleSearch };
}
