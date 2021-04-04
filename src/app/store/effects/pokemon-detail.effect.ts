import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { PokemonService } from '../../services/pokemon.service';
import { loadPokemon, setPokemon } from '../actions/pokemons.actions';
import { map, mergeMap, pluck } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PokemonDetailEffect {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  loadPokemon$ = createEffect(() => this.actions$.pipe(
    ofType(loadPokemon),
    mergeMap(
      (action) => {
        if (action.pokemonId) {
          return this.pokemonService.getPokemonById(action.pokemonId)
            .pipe(
              pluck('body'),
              map((pokemon) => setPokemon({ pokemon }))
          );
        } else {
          return of(setPokemon({ pokemon: null }));
        }
      }
    )
  ));
}
