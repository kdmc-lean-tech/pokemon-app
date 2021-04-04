import { SocketState } from '../models/socket.model';
import { AuthState } from '../models/auth.model';
import { UI } from '../models/ui.model';
import { PokemonState, PokemonDetailState } from './pokemons.model';
import { ChatState } from './chat.model';

export interface AppState {
  pokemons: PokemonState;
  ui: UI;
  auth: AuthState;
  socket: SocketState;
  chat: ChatState;
  pokemon: PokemonDetailState;
}
