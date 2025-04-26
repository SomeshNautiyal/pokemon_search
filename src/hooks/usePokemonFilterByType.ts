import { useState, useEffect } from 'react';
import { Pokemon } from '../../types/pokemon';

export function usePokemonFilterByType(
  selectedType: string, 
  allPokemon: Pokemon[]
) {
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(allPokemon);

  useEffect(() => {
    const fetchPokemonByType = async () => {
      if (!selectedType) {
        setFilteredPokemon(allPokemon);
        return;
      }

      const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
      const data = await response.json();
      const pokemonOfType = data.pokemon.map(
        (p: { pokemon: { name: string } }) => p.pokemon.name
      );

      const matchedPokemon = allPokemon.filter((p) =>
        pokemonOfType.includes(p.name)
      );
      setFilteredPokemon(matchedPokemon);
    };

    fetchPokemonByType();
  }, [selectedType, allPokemon]);

  return filteredPokemon;
}
