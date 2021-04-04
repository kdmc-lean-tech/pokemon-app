import { createReducer, on, Action } from '@ngrx/store';
import { PokemonDetailState } from '../models/pokemons.model';
import { loadPokemon, setPokemon } from '../actions/pokemons.actions';

const initialState: PokemonDetailState = {
  pokemon: null,
  pokemonId: null
}

const _pokemonDetailReducer = createReducer(initialState,
  on(loadPokemon, (state, { pokemonId }) => {
    return {
      ...state,
      pokemonId
    }
  }),
  on(setPokemon, (state, { pokemon }) => {
    return {
      ...state,
      pokemonId: state.pokemonId,
      pokemon
    }
  })
);

export const pokemonDetailReducer = (state: PokemonDetailState, action: Action) => {
  return _pokemonDetailReducer(state, action);
}
