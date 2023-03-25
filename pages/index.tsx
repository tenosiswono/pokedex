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
  // Set initial state for the list of pokemons, the URL for the next page of data, and the loading status.
  const [pokemons, setPokemons] = useState<Pokemon[]>(pokemonsProp);
  const [nextUrl, setNextUrl] = useState<string | null>(nextProp);
  const [loading, setLoading] = useState(false);

  // Use the `useInView` hook to track whether an element is visible in the viewport.
  const [anchorRef, anchorInView] = useInView();

  // Determine whether there is a next page of data to load.
  const hasNext = !!nextUrl && nextUrl !== null;

  // Define a function for loading the next page of data.
  const loadPokemons = useCallback(
    async (nextUrl: string) => {
      // Set the loading status to `true` while the data is being loaded.
      setLoading(true);
      // Fetch the next page of data from the API.
      const response = await PokemonAPI.getPokemonListByUrl(nextUrl);
      // Fetch the details for each Pokemon in the list.
      const pokemonsResponse = await Promise.all(
        response.results.map((pokemon) =>
          PokemonAPI.getPokemonByUrl(pokemon.url)
        )
      );
      // Update the state with the new list of Pokemon and the URL for the next page of data.
      setNextUrl(response.next);
      setPokemons([...pokemons, ...pokemonsResponse]);
      // Set the loading status to `false` now that the data has been loaded.
      setLoading(false);
    },
    [pokemons]
  );

  // Use the `useEffect` hook to trigger the loading of the next page of data when the anchor element becomes visible in the viewport.
  useEffect(() => {
    if (hasNext && anchorInView && !loading) {
      loadPokemons(nextUrl);
    }
  }, [hasNext, anchorInView, loadPokemons, nextUrl, loading]);

  // Render the list of Pokemon cards, along with a preloader if the data is still being loaded, and an anchor element to trigger the loading of the next page of data.
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

/**
 *  
 * the API is overfetching at this point, will trigger warning large-page-data
 * will ignore it because it only test, real practice with proper API we should avoid over fetching
 * 
 * */ 
export async function getServerSideProps() {
  try {
    // Fetch the initial page of data from the API.
    const response = await PokemonAPI.getPokemonList(0, LIMIT);
    // Fetch the details for each Pokemon in the list.
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
