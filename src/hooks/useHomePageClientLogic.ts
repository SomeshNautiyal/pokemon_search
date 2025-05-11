"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { usePokemonFilterByType } from "@/hooks/usePokemonFilterByType";
import { fetchPokemonList } from "@/lib/pokemon";
import { Pokemon } from "../../types/pokemon";
import { useSearchParams } from "next/navigation";

export function useHomePageClientLogic(allPokemon: Pokemon[]) {
  const params = useSearchParams();
  const type = params.get("type");
  const search = params.get("search");
  const [pokemon, setPokemon] = useState<Pokemon[]>(allPokemon);
  const [searchTerm, setSearchTerm] = useState(search|| "");
  const [selectedType, setSelectedType] = useState<string>(type || "");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(20);

  const { filteredPokemon, handleSearch } = useSearchFilter(searchTerm, pokemon);
  const filteredByType = usePokemonFilterByType(selectedType, filteredPokemon);

  const loadMorePokemon = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const newPokemon = await fetchPokemonList(offset, 20);

    setPokemon((prev) => {
      const updatedPokemon = [...prev, ...newPokemon];
      handleSearch(searchTerm, updatedPokemon);
      return updatedPokemon;
    });

    setOffset((prev) => prev + 20);
    setLoading(false);
  }, [loading, offset, searchTerm, handleSearch]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        document.documentElement.scrollHeight - window.scrollY <= window.innerHeight + 100;
      if (bottom) {
        loadMorePokemon();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePokemon]);

  return {
    pokemon,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    filteredByType,
    loading,
    handleSearch,
  };
}
