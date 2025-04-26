export interface PokemonListItem {
  name: string;
  url: string;
}

export type Pokemon = {
  name: string;
  url: string;
  image?: string;
};

export type PokemonData = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  types: {
    type: { name: string };
  }[];
  abilities: {
    ability: { name: string };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

export type PokemonDetailProps = {
  params: {
    name: string;
  };
  pokemonData: PokemonData;
};
