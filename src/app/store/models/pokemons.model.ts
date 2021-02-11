import { Pokemon } from '../../models/pokemon.model';
import { SortPokemonColumn, SortType } from '../../models/filter.model';

export interface PokemonSort {
  columnName: SortPokemonColumn;
  sortType: SortType;
}

export interface PokemonFilter {
  page: number;
  itemPerPage: number;
  search: string;
  sort: PokemonSort;
}

export interface PokemonState {
  pokemons: Pokemon[];
  filters: PokemonFilter;
  len: number;
}
