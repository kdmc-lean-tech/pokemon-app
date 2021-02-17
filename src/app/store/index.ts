import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './models/app.model';
import { pokemonReducer } from './reducers/pokemons.reducer';
import { environment } from '../../environments/environment';
import { PokemonEffects } from './effects/pokemon.effects';
import { uiReducer } from './reducers/ui.reducer';
import { authReducer } from 'src/app/store/reducers/auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer,
  ui: uiReducer,
  auth: authReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const effects: any[] = [PokemonEffects];
