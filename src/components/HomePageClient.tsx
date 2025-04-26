"use client";
import PokemonCard from "./PokemonCard";
import Image from "next/image";
import { useHomePageClientLogic } from "@/hooks/useHomePageClientLogic";
import { Pokemon, PokemonListItem } from "../../types/pokemon";

interface HomePageClientProps {
  allPokemon: Pokemon[];
  types: PokemonListItem[];
}

export default function HomePageClient({ allPokemon, types }: HomePageClientProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    filteredByType,
    loading,
    handleSearch,
  } = useHomePageClientLogic(allPokemon);

  return (
    <main className=" min-h-screen py-6">
      <div className="px-4">
        <div className="mb-2 relative sm:max-w-[30%]">
          <select
            className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-6 py-3 pr-10 shadow-sm appearance-none focus:outline-none"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm">
            &#8964;
          </div>
        </div>

        <div className="mb-14 flex items-center sm:max-w-1/2">
          <div className="relative w-full">
            <Image
              src="/search.svg"
              alt="Search Icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleSearch(searchTerm)}
            className="px-6 py-3 bg-[#004368] text-white rounded-r-lg shadow-md focus:outline-none"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {filteredByType.length === 0 && searchTerm === "" ? (
            <p className="text-center mt-10 text-gray-500">No Pokémon found.</p>
          ) : (
            filteredByType.map((poke) => (
              <PokemonCard
                key={poke.name}
                name={poke.name}
                url={poke.image || ""}
              />
            ))
          )}
        </div>

        {loading && (
          <p className="text-center mt-10 text-gray-500">Loading more...</p>
        )}
      </div>
    </main>
  );
}
