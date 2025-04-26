"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { usePokemonFilterByType } from "@/hooks/usePokemonFilterByType";
import { fetchPokemonList } from "@/lib/pokemon";
import { Pokemon } from "../../types/pokemon";

export function useHomePageClientLogic(allPokemon: Pokemon[]) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(allPokemon);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
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
