'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PokemonListItem } from '../../types/pokemon'

const PokemonCard = ({ name, url }: PokemonListItem) => {
  return (
    <div className="h-80 w-full max-w-s mx-auto flex flex-col rounded-2xl shadow-md overflow-hidden bg-white transition">
      <div className="flex-2 bg-white flex justify-center items-center p-4">
        <Image
          src={url}
          alt={name}
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>

      <div className="flex-3 bg-gray-100 p-6 flex flex-col justify-between">
        <h2 className="text-lg font-semibold capitalize text-gray-800">{name}</h2>
        <Link
          href={`/${name}`}
          className="text-sm text-[#86b3cf] hover:underline"
        >
          Details →
        </Link>
      </div>
    </div>
  )
}

export default PokemonCard
