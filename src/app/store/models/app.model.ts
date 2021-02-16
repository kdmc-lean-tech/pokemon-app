import { UI } from 'src/app/store/models/ui.model';
import { PokemonState } from './pokemons.model';

export interface AppState {
  pokemons: PokemonState;
  ui: UI;
}
