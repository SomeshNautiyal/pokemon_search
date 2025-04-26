import { Pokemon, PokemonListItem } from "../../types/pokemon";

export async function fetchPokemonList(offset: number, limit: number = 20): Promise<Pokemon[]> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch list: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid data format received from list API");
    }
    console.log(data.results);
    return data.results.map((pokemon: Pokemon, index: number) => ({
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`,
    }));

  } catch (error) {
    console.error("Error fetching list:", error);
    return [];
  }
}

export async function fetchPokemonTypes(): Promise<PokemonListItem[]> {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type');

    if (!response.ok) {
      throw new Error(`Failed to fetch types: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid data format received from types API");
    }

    return data.results.filter((type: PokemonListItem) =>
      !['shadow', 'unknown'].includes(type.name)
    );

  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
}
