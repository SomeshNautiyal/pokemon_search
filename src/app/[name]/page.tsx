import BackButton from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import { PokemonDetailProps, PokemonData } from "../../../types/pokemon";

export default async function PokemonDetailPage({ params }: PokemonDetailProps) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Error loading Pokémon.
      </div>
    );
  }

  const data: PokemonData = await res.json();

  const types = data.types.map((t) => t.type.name).join(", ");
  const abilities = data.abilities.map((a) => a.ability.name).join(", ");
  const moves = data.moves.slice(0, 5).map((m) => m.move.name).join(", ");
  const stats = data.stats.map((s) => `${s.stat.name}: ${s.base_stat}`).join(", ");

  return (
    <div className=" min-h-screen flex flex-col items-center">
      <div className="mb-6 w-full max-w-4xl ml-auto pr-4">
        <BackButton />
      </div>

      <div className="text-blue-700 w-full max-w-4xl text-sm my-4 pr-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="capitalize">{params.name}</span>
      </div>

      <div className="max-w-100 bg-white shadow-lg flex flex-col items-center mx-auto my-30 rounded-xl ml-auto">
        <div className="w-full bg-[#00ffd0] flex justify-center items-center p-6 rounded-t-xl">
          <Image
            src={
              data.sprites.other["official-artwork"].front_default ||
              data.sprites.front_default
            }
            alt={data.name}
            width={250}
            height={250}
            quality={100}
          />
        </div>

        <div className="w-full bg-[#f9c268] p-6 text-black text-left rounded-b-xl">
          <p className="mt-2">
            <strong>Name:</strong> {data.name}
          </p>

          <p className="mt-2">
            <strong>Type:</strong> {types}
          </p>

          <p className="mt-2">
            <strong>Stats:</strong> {stats}
          </p>

          <p className="mt-2">
            <strong>Abilities:</strong> {abilities}
          </p>

          <p className="mt-2">
            <strong>Some Moves:</strong> {moves}
          </p>
        </div>
      </div>
    </div>
  );
}
