import { TypeBgColor, TypeColor } from "@/constants/typeColor";
import { Pokemon } from "@/models/Pokemon";
import Image from "next/image";
import React from "react";
import Pokeball from "./Pokeball";
import { capitalizeWord, padWithZeros } from "@/utils/transform";
import Link from "next/link";

export default function PokemonCard(props: Pokemon) {
  return (
    <Link href={`/pokemon/${props.id}`}>
      <div
        className="border border-gray-200 rounded-lg shadow p-5 flex-col flex relative  items-center justify-center pt-20"
        style={{
          backgroundColor: TypeBgColor[props.types[0].type.name],
        }}
        data-testid="pokemon-card"
      >
        <div className="h-32 absolute w-32 -top-16">
          <Pokeball
            style={{
              fill: "rgba(225, 225, 225, 0.5)",
            }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24">
            <Image
              src={props.sprites.other?.dream_world.front_default || "/img/notfound.svg"}
              alt={props.name}
              width={96}
              height={96}
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>
        </div>
        <h3 className="mb-2 text-l font-bold  text-white">
          #{padWithZeros(props.id, 3)}
        </h3>
        <h5 className="mb-2 text-2xl font-bold  text-white">
          {capitalizeWord(props.name)}
        </h5>
        <div className="flex flex-row gap-2">
          {props.types.map((type) => (
            <div
              key={`types-${type.slot}`}
              className="p-2 rounded-md text-sm text-white"
              style={{
                backgroundColor: TypeColor[type.type.name],
              }}
            >
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
