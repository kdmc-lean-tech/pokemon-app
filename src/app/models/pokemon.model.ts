import { Base } from './base.model';
import { PokemonType } from './pokemon-types.model';
import { PokemonAbility } from './pokemon-abilities.model';
import { PokemonStatistic } from './pokemon-statistics.model';
import { CreatedBy } from './user.model';
import { Paginator } from '../shared/models/paginator.model';

export interface Pokemon extends Base {
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  pokedexNumber: number;
}

export interface PokemonDetail extends Pokemon {
  isLegendary: boolean;
  generation: number;
  weight: number;
  speed: number;
  japaneseName: string;
  height: number;
  pokemonStatistics: PokemonStatistic;
  createdBy: CreatedBy;
}

export interface PokemonResponse {
  body: PokemonResponseBody; 
}

export interface PokemonResponseBody {
  results: Pokemon[];
  paginator: Paginator;
}
