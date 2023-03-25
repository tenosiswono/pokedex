import { render, waitFor } from "@testing-library/react";
import PokemonId, { getServerSideProps } from "@/pages/pokemon/[id]";
import pokemon from '../../../mocks/response/id.json'
import { capitalizeWord } from "@/utils/transform";

describe("Home component", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it("should render a list of pokemons", async () => {
    const screen = render(
      <PokemonId
        pokemon={pokemon}
      />
    );
    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText(/electric/)).toBeInTheDocument();
    const image = screen.getByAltText("pikachu");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg");
    pokemon.stats.map(stat => {
      expect(screen.getByText(capitalizeWord(stat.stat.name))).toBeInTheDocument()
      expect(screen.getByTestId(`stats-item-${stat.stat.name}`)).toBeInTheDocument()
      expect(screen.getByTestId(`stats-item-${stat.stat.name}`)).toHaveTextContent(stat.base_stat.toString())
    })
  });
});


describe("getServerSideProps", () => {
  it("should return pokemon", async () => {
    const result = await getServerSideProps({ query: { id: 10 }});
    expect(result?.props?.pokemon).toEqual(pokemon);
  });
});
