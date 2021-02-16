import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PokemonService } from '../../services/pokemon.service';
import { AppState } from '../models/app.model';
import {
  loadPokemons,
  setPaginatorFilter,
  setSearchFilter,
  setPokemons,
  toggleSortFilter,
  toogleSortFilterBySelects
} from '../actions/pokemons.actions';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private store: Store<AppState>
  ) {}

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(loadPokemons, setPaginatorFilter, setSearchFilter, toggleSortFilter, toogleSortFilterBySelects),
    withLatestFrom(this.store.select('pokemons')),
    mergeMap(([, { filters }]) => {
      return this.pokemonService.getPokemons(filters)
        .pipe(
          map(({ body }) => setPokemons(
            { 
              pokemons: body.results,
              len: body.paginator.count
            }
          ))
        )
    })
  ));
}
