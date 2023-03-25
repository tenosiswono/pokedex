import Layout from "@/components/Layout";
import StatsItem from "@/components/StatsItem";
import { TypeBgColor, TypeColor } from "@/constants/typeColor";
import { Pokemon } from "@/models/Pokemon";
import PokemonAPI from "@/utils/PokemonAPI";
import { capitalizeWord, padWithZeros } from "@/utils/transform";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PokemonId({ pokemon }: { pokemon: Pokemon }) {
  const colorTheme = TypeBgColor[pokemon.types[0].type.name];
  return (
    <Layout title={`Pokedex - ${capitalizeWord(pokemon.name)}`}>
      <div
        className="p-10 mt-8 rounded-xl"
        style={{
          backgroundColor: colorTheme,
        }}
      >
        <Link
          href="/"
          className="text-white hover:text-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-sm text-m text-center inline-flex items-center mb-5"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
          </svg>
        </Link>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold  text-white">
              #{padWithZeros(pokemon.id, 3)}
            </h3>
            <h5 className="mb-2 text-4xl font-bold  text-white">
              {capitalizeWord(pokemon.name)}
            </h5>
            <div className="flex flex-row gap-2">
              {pokemon.types.map((type) => (
                <div
                  key={`types-${type.slot}`}
                  className="p-2 rounded-md text-m text-white"
                  style={{
                    backgroundColor: TypeColor[type.type.name],
                  }}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                "/img/notfound.svg"
              }
              alt={pokemon.name}
              width={320}
              height={320}
              className="object-contain h-80 z-10"
            />
          </div>
        </div>
        <div className="p-10 rounded-xl bg-white -m-10">
          <h5 className="mb-2 text-xl font-medium">Stats</h5>
          <div className="grid grid-cols-2 gap-2">
            {pokemon.stats.map((stat) => (
              <StatsItem
                key={`stats-${stat.stat.name}`}
                name={capitalizeWord(stat.stat.name)}
                value={stat.base_stat}
                color={colorTheme}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }: { query: { id: number } }) {
  const id = query.id;
  try {
    const pokemon = await PokemonAPI.getPokemonById(id);
    return {
      props: { pokemon },
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
