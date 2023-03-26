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
  // Set initial state for the list of pokemons, the URL for the next page of data, error, and the loading status.
  const [pokemons, setPokemons] = useState<Pokemon[]>(pokemonsProp);
  const [nextUrl, setNextUrl] = useState<string | null>(nextProp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Use the `useInView` hook to track whether an element is visible in the viewport.
  const [anchorRef, anchorInView] = useInView();

  // Determine whether there is a next page of data to load.
  const hasNext = !!nextUrl && nextUrl !== null;

  // Define a function for loading the next page of data.
  const loadPokemons = useCallback(
    async (nextUrl: string) => {
      // Set the loading status to `true` while the data is being loaded.
      setLoading(true);
      setError(null);
      try {
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
      } catch (e) {
        console.error(e);
        setError(e);
      }
      // Set the loading status to `false` now that the data has been loaded.
      setLoading(false);
    },
    [pokemons]
  );

  // Use the `useEffect` hook to trigger the loading of the next page of data when the anchor element becomes visible in the viewport.
  useEffect(() => {
    if (hasNext && anchorInView && !loading && !error) {
      loadPokemons(nextUrl);
    }
  }, [hasNext, anchorInView, loadPokemons, nextUrl, loading, error]);

  // Render the list of Pokemon cards, along with a preloader if the data is still being loaded, and an anchor element to trigger the loading of the next page of data.
  return (
    <Layout title="Pokedex - Home">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20 mt-20 mx-5 relative">
        {pokemons.map((pokemon, idx) => (
          <PokemonCard
            key={`pokemon-${pokemon.id}-${idx}`}
            {...pokemon}
          ></PokemonCard>
        ))}
        {loading && <Preloader />}
        {error && (
          <>
            <Preloader />
            <div
              className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow  absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-32"
              role="alert"
              data-testid="notif-error"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg ">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Warning icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">
                {error?.message || "Something Error"}
              </div>
              <div className="flex items-center ml-auto space-x-2">
                <button
                  onClick={() => nextUrl && loadPokemons(nextUrl)}
                  className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg"
                  data-testid="notif-error-btn"
                >
                  Retry
                </button>
              </div>
            </div>
          </>
        )}
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
      throw error;
    }
  }
}
