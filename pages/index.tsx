import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Pokemon } from "@/models/Pokemon";
import PokemonAPI from "@/utils/PokemonAPI";
import PokemonCard from "@/components/PokemonCard";
import Preloader from "@/components/Preloader";
import Layout from "@/components/Layout";

const LIMIT = 9;

export default function Home({
  pokemonsProp,
  nextProp,
}: {
  pokemonsProp: Pokemon[];
  nextProp: string | null;
}) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(pokemonsProp);
  const [nextUrl, setNextUrl] = useState<string | null>(nextProp);
  const [loading, setLoading] = useState(false);
  const [anchorRef, anchorInView] = useInView();
  const hasNext = !!nextUrl && nextUrl !== null;
  const loadPokemons = useCallback(
    async (nextUrl: string) => {
      setLoading(true);
      const response = await PokemonAPI.getPokemonListByUrl(nextUrl);
      const pokemonsResponse = await Promise.all(
        response.results.map((pokemon) =>
          PokemonAPI.getPokemonByUrl(pokemon.url)
        )
      );
      setNextUrl(response.next);
      setPokemons([...pokemons, ...pokemonsResponse]);
      setLoading(false);
    },
    [pokemons]
  );

  useEffect(() => {
    if (hasNext && anchorInView && !loading) {
      loadPokemons(nextUrl);
    }
  }, [hasNext, anchorInView, loadPokemons, nextUrl, loading]);

  return (
    <Layout title="Pokedex - Home">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20 mt-20 mx-5">
        {pokemons.map((pokemon, idx) => (
          <PokemonCard
            key={`pokemon-${pokemon.id}-${idx}`}
            {...pokemon}
          ></PokemonCard>
        ))}
        {loading && <Preloader />}
        {hasNext && (
          <div id="test-infinite-scroll-beacon" key="anchor" ref={anchorRef} />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await PokemonAPI.getPokemonList(0, LIMIT);
    const pokemonsProp = await Promise.all(
      response.results.map((pokemon) => PokemonAPI.getPokemonByUrl(pokemon.url))
    );
    return {
      props: { pokemonsProp, nextProp: response.next },
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {
        notFound: true,
      };
    } else {
      throw error
    }
  }
}
