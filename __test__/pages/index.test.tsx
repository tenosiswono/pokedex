import { render, waitFor } from "@testing-library/react";
import Index, { getServerSideProps } from "@/pages/index";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import pokemon from "../../mocks/response/id.json";
import pokemonList from "../../mocks/response/list.json";

describe("Home component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a list of pokemons", async () => {
    const { getAllByTestId } = render(
      <Index
        pokemonsProp={[pokemon, pokemon, pokemon]}
        nextProp={"https://pokeapi.co/api/v2/pokemon?offset=3&limit=9"}
      />
    );
    // initial pokemon is 3
    await waitFor(() => {
      expect(getAllByTestId("pokemon-card")).toHaveLength(3);
    });
    // set intersection observer true to load more pokemon
    mockAllIsIntersecting(true);
    await waitFor(() => {
      expect(getAllByTestId("preloader")).toHaveLength(3);
    });
    // set intersection observer false to stop load more pokemon when already loading
    mockAllIsIntersecting(false);
    await waitFor(() => {
      expect(getAllByTestId("pokemon-card")).toHaveLength(12);
    });
  });
});

describe("getServerSideProps", () => {
  it("should return pokemon list", async () => {
    const result = await getServerSideProps();
    expect(result?.props?.nextProp).toEqual(pokemonList.next);
    // same pokemon x9 lol
    expect(result?.props?.pokemonsProp).toEqual([
      pokemon,
      pokemon,
      pokemon,
      pokemon,
      pokemon,
      pokemon,
      pokemon,
      pokemon,
      pokemon,
    ]);
  });
});
