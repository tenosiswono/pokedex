export interface PokemonList {
  count: number;
  next: string | null;
  previous:  string | null;
  results: PokemonResult[];
}

export  interface PokemonResult {
  name: string;
  url: string;
}