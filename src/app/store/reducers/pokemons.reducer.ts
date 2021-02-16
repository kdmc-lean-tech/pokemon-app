import { createReducer, on, Action } from '@ngrx/store';
import { PokemonState, PokemonFilter, PokemonSort } from '../models/pokemons.model';
import { SortType } from '../../models/filter.model';
import { toogleSortFilterBySelects } from '../actions/pokemons.actions';
import {
  loadPokemons,
  setPokemons,
  setPaginatorFilter,
  setSearchFilter,
  toggleSortFilter
} from '../actions/pokemons.actions';

export const initialState: PokemonState = {
  pokemons: [],
  filters: {
    page: 1,
    itemPerPage: 5,
    search: '',
    sort: { columnName: 'createdAt', sortType: 1 }
  },
  len: 0
};

// tslint:disable-next-line: variable-name
const _pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, (state) => ({ ...state })),
  on(setPokemons, (state, { pokemons, len }) => {
    return {
      ...state,
      pokemons,
      len
    };
  }),
  on(setPaginatorFilter, (state, { page, itemPerPage }) => {
    const filters: PokemonFilter = {
      ...state.filters,
      page,
      itemPerPage
    };
    return {
      ...state,
      filters
    };
  }),
  on(setSearchFilter, (state, { search }) => {
    const filters: PokemonFilter = {
      ...state.filters,
      page: initialState.filters.page,
      itemPerPage: initialState.filters.itemPerPage,
      search
    };
    return {
      ...state,
      filters
    };
  }),
  on(toggleSortFilter, (state, { columnName }) => {
    const sortFilter = state.filters.sort;
    let sort: PokemonSort;
    if (sortFilter) {
      if (sortFilter.columnName === columnName) {
        if (sortFilter.sortType === SortType.Descending) {
          sort = { columnName, sortType: SortType.Ascending };
        } else {
          sort = initialState.filters.sort;
        }
      } else {
        sort = { columnName, sortType: SortType.Descending };
      }
    } else {
      sort = { columnName, sortType: SortType.Descending };
    }
    const filters: PokemonFilter = {
      ...state.filters, sort, page: initialState.filters.page
    };
    return { ...state, filters };
  }),
  on(toogleSortFilterBySelects, (state, { columnName, sortType }) => {
    const sort: PokemonSort = {
      columnName,
      sortType
    };
    const filters: PokemonFilter = {
      ...state.filters, sort, page: initialState.filters.page
    };
    return { ...state, filters };
  })
);

export function pokemonReducer(state: PokemonState, action: Action) {
  return _pokemonReducer(state, action);
}
