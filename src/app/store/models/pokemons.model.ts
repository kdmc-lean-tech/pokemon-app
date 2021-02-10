import { Pokemon } from '../../models/pokemon.model';

export interface PokemonFilter {
  page: number;
  itemPerPage: number;
  search: string;
}

export interface PokemonState {
  pokemons: Pokemon[];
  filters: PokemonFilter;
  len: number;
}
