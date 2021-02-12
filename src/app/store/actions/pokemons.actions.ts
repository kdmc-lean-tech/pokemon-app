import { createAction, props } from "@ngrx/store";
import { Pokemon } from '../../models/pokemon.model';
import { SortPokemonColumn, SortType } from '../../models/filter.model';

export const loadPokemons = createAction(
  '[Pokemons] Load Pokemons'
);

export const setPokemons = createAction(
  '[Pokemons] Set Pokemons',
  props<{ pokemons: Pokemon[], len: number }>()
);

export const setSearchFilter = createAction(
  '[Pokemons] Set Search Filter',
  props<{ search: string }>()
);

export const setPaginatorFilter = createAction(
  '[Pokemons] Set Paginator Filter',
  props<{ page: number, itemPerPage: number }>()
);

export const toggleSortFilter = createAction(
  '[Pokemon] Toggle Sort Filter',
  props<{ columnName: SortPokemonColumn }>()
);

export const toogleSortFilterBySelects = createAction(
  '[Pokemon] Toogle Sort Filter',
  props<{ columnName: SortPokemonColumn, sortType: SortType }>()
);
