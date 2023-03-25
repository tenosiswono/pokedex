import PokemonAPI from '../../utils/PokemonAPI';
import ApiClient from '../../utils/axios';
import { Pokemon } from '@/models/Pokemon';
import { PokemonList } from '@/models/PokemonList';
import { AxiosResponse } from 'axios';

jest.mock('../../utils/axios');

describe('PokemonAPI', () => {
  describe('getPokemonList', () => {
    const pokemonList: PokemonList = {
      count: 1118,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    beforeEach(() => {
      (ApiClient.get as jest.Mock).mockClear();
    });

    it('should call the API with default parameters', async () => {
      (ApiClient.get as jest.Mock).mockResolvedValueOnce({
        data: pokemonList,
      } as AxiosResponse<PokemonList>);

      const result = await PokemonAPI.getPokemonList();

      expect(ApiClient.get).toHaveBeenCalledTimes(1);
      expect(ApiClient.get).toHaveBeenCalledWith('/pokemon?offset=0&limit=20');
      expect(result).toEqual(pokemonList);
    });

    it('should call the API with custom parameters', async () => {
      (ApiClient.get as jest.Mock).mockResolvedValueOnce({
        data: pokemonList,
      } as AxiosResponse<PokemonList>);

      const result = await PokemonAPI.getPokemonList(100, 50);

      expect(ApiClient.get).toHaveBeenCalledTimes(1);
      expect(ApiClient.get).toHaveBeenCalledWith('/pokemon?offset=100&limit=50');
      expect(result).toEqual(pokemonList);
    });

    it('should reject with an error if the API call fails', async () => {
      const error = new Error('API call failed');
      (ApiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(PokemonAPI.getPokemonList()).rejects.toThrow(error);
    });
  });

  describe('getPokemonById', () => {
    const bulbasaur: Partial<Pokemon> = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
    };

    beforeEach(() => {
      (ApiClient.get as jest.Mock).mockClear();
    });

    it('should call the API with the given ID', async () => {
      (ApiClient.get as jest.Mock).mockResolvedValueOnce({
        data: bulbasaur,
      } as AxiosResponse<Pokemon>);

      const result = await PokemonAPI.getPokemonById(1);

      expect(ApiClient.get).toHaveBeenCalledTimes(1);
      expect(ApiClient.get).toHaveBeenCalledWith('/pokemon/1');
      expect(result).toEqual(bulbasaur);
    });

    it('should reject with an error if the API call fails', async () => {
      const error = new Error('API call failed');
      (ApiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(PokemonAPI.getPokemonById(1)).rejects.toThrow(error);
    });
  });

  describe('getPokemonListByUrl', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=3&limit=9';
  
    beforeEach(() => {
      (ApiClient.get as jest.Mock).mockClear();
    });

    it('returns a Pokemon object on success', async () => {
      const pokemonList: PokemonList = {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };;
      const response = { data: pokemonList };
      (ApiClient.get as jest.Mock).mockResolvedValue(response);
  
      const result = await PokemonAPI.getPokemonListByUrl(url);
  
      expect(result).toEqual(pokemonList);
      expect(ApiClient.get).toHaveBeenCalledTimes(1);
      expect(ApiClient.get).toHaveBeenCalledWith(url);
    });
  
    it('throws an error on failure', async () => {
      const error = new Error('404 Not Found');
      (ApiClient.get as jest.Mock).mockRejectedValue(error);
  
      await expect(PokemonAPI.getPokemonListByUrl(url)).rejects.toEqual(error);
      expect(ApiClient.get).toHaveBeenCalledTimes(1);
      expect(ApiClient.get).toHaveBeenCalledWith(url);
    });
  });

  describe('getPokemonByUrl', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/1';
  
    beforeEach(() => {
      (ApiClient.get as jest.Mock).mockClear();
    });

    it('returns a Pokemon object on success', async () => {
      const pokemon = { name: 'bulbasaur', id: 1 };
      const response = { data: pokemon };
      (ApiClient.get as jest.Mock).mockResolvedValue(response);
  
      const result = await PokemonAPI.getPokemonByUrl(url);
  
      expect(result).toEqual(pokemon);
      expect(ApiClient.get).toHaveBeenCalledTimes(1);
      expect(ApiClient.get).toHaveBeenCalledWith(url);
    });
  
    it('throws an error on failure', async () => {
      const error = new Error('404 Not Found');
      (ApiClient.get as jest.Mock).mockRejectedValue(error);
  
      await expect(PokemonAPI.getPokemonByUrl(url)).rejects.toEqual(error);
      expect(ApiClient.get).toHaveBeenCalledTimes(1);
      expect(ApiClient.get).toHaveBeenCalledWith(url);
    });
  });
});

