import { PokemonList } from "@/models/PokemonList";
import ApiClient from "./axios";
import { AxiosResponse, AxiosError } from "axios";
import { Pokemon } from "@/models/Pokemon";

const PokemonAPI = {
  async getPokemonList(offset?: number, limit?: number): Promise<PokemonList> {
    return new Promise<PokemonList>((resolve, reject) => {
      ApiClient.get<PokemonList>(
        `/pokemon?offset=${offset || 0}&limit=${limit || 20}`
      )
        .then((response: AxiosResponse<PokemonList>) => resolve(response.data))
        .catch((error: AxiosError<string>) => reject(error));
    });
  },
  async getPokemonListByUrl(url: string): Promise<PokemonList> {
    return new Promise<PokemonList>((resolve, reject) => {
      ApiClient.get<PokemonList>(url)
        .then((response: AxiosResponse<PokemonList>) => resolve(response.data))
        .catch((error: AxiosError<string>) => reject(error));
    });
  },
  async getPokemonById(id: number): Promise<Pokemon> {
    return new Promise<Pokemon>((resolve, reject) => {
      ApiClient.get<Pokemon>(`/pokemon/${id}`)
        .then((response: AxiosResponse<Pokemon>) => resolve(response.data))
        .catch((error: AxiosError<string>) => reject(error));
    });
  },
  async getPokemonByUrl(url: string): Promise<Pokemon> {
    return new Promise<Pokemon>((resolve, reject) => {
      ApiClient.get<Pokemon>(url)
        .then((response: AxiosResponse<Pokemon>) => resolve(response.data))
        .catch((error: AxiosError<string>) => reject(error));
    });
  },
};

export default PokemonAPI