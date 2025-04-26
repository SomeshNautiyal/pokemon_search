import { fetchPokemonList, fetchPokemonTypes } from "@/lib/pokemon";
import HomePageClient from "@/components/HomePageClient";

// Fetch the initial set of items for server-side rendering
export default async function HomePage() {
  const allPokemon = await fetchPokemonList(0, 20); // Fetch the first 20 items
  const types = await fetchPokemonTypes();

  return (
    <HomePageClient allPokemon={allPokemon} types={types} />
  );
}
