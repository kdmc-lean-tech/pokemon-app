import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './models/app.model';
import { pokemonReducer } from './reducers/pokemons.reducer';
import { environment } from '../../environments/environment';
import { PokemonEffects } from './effects/pokemon.effects';
import { uiReducer } from './reducers/ui.reducer';
import { authReducer } from './reducers/auth.reducer';
import { socketReducer } from './reducers/socket.reducer';

export const reducers: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer,
  ui: uiReducer,
  auth: authReducer,
  socket: socketReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const effects: any[] = [PokemonEffects];
