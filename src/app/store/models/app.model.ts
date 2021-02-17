import { SocketState } from '../models/socket.model';
import { AuthState } from '../models/auth.model';
import { UI } from '../models/ui.model';
import { PokemonState } from './pokemons.model';

export interface AppState {
  pokemons: PokemonState;
  ui: UI;
  auth: AuthState;
  socket: SocketState;
}
