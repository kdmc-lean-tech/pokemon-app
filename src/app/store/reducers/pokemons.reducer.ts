import { createReducer, on, Action } from '@ngrx/store';
import { PokemonState, PokemonFilter } from '../models/pokemons.model';
import {
  loadPokemons,
  setPokemons,
  setPaginatorFilter,
  setSearchFilter
} from '../actions/pokemons.actions';

export const initialState: PokemonState = {
  pokemons: [],
  filters: {
    page: 1,
    itemPerPage: 10,
    search: ''
  },
  len: 0
}

const _pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, (state) => ({ ...state })),
  on(setPokemons, (state, { pokemons, len }) => {
    return {
      ...state,
      pokemons,
      len
    }
  }),
  on(setPaginatorFilter, (state, { page, itemPerPage }) => {
    const filters: PokemonFilter = {
      ...state.filters,
      page,
      itemPerPage
    }
    return {
      ...state,
      filters
    }
  }),
  on(setSearchFilter, (state, { search }) => {
    const filters: PokemonFilter = {
      ...state.filters,
      page: initialState.filters.page,
      itemPerPage: initialState.filters.itemPerPage,
      search
    }
    return {
      ...state,
      filters
    }
  })
);

export function pokemonReducer(state: PokemonState, action: Action) {
  return _pokemonReducer(state, action);
}
