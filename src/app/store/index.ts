import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from './models/app.model';
import { pokemonReducer } from './reducers/pokemons.reducer';
import { environment } from '../../environments/environment';
import { PokemonEffects } from './effects/pokemon.effects';

export const reducers: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const effects: any[] = [PokemonEffects];
