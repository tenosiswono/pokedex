import { render, screen } from "@testing-library/react";
import PokemonCard from "@/components/PokemonCard";
import { Pokemon } from "@/models/Pokemon";
import pokemonJson from '../../mocks/response/id.json'

const mockPokemon: Pokemon = pokemonJson;

describe("PokemonCard", () => {
  test("renders the Pokemon's name, ID, and types", () => {
    render(<PokemonCard {...mockPokemon} />);

    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText(/electric/)).toBeInTheDocument();
  });

  test("renders the Pokemon's image", () => {
    render(<PokemonCard {...mockPokemon} />);

    const image = screen.getByAltText("pikachu");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg");
  });

  test("renders the Pokemon's image notfound", () => {
    const mock: Pokemon = {
      ...mockPokemon
    }
    mock.sprites.other!.dream_world.front_default = null
    render(<PokemonCard {...mock} />);

    const image = screen.getByAltText("pikachu");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/img/notfound.svg");
  });

  test("renders a link to the Pokemon's page", () => {
    render(<PokemonCard {...mockPokemon} />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/pokemon/25");
  });
});
