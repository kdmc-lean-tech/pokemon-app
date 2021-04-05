import { Base } from './base.model';
import { PokemonStatistic } from './pokemon-statistics.model';
import { CreatedBy } from './user.model';
import { Paginator } from '../shared/models/paginator.model';
import { Avatar } from '../models/avatar.model';
import { Status } from '../models/status.model';

export interface Pokemon extends Base {
  name: string;
  pokedexNumber: number;
  generation: number;
  createdBy: CreatedBy;
  avatar?: Avatar;
  status: Status;
  closingDate: Date;
}

export interface PokemonWithRemainingTime extends Pokemon {
  remainingTime?: string;
}

export interface PokemonDetail extends Pokemon {
  isLegendary: boolean;
  generation: number;
  weight: number;
  height: number;
  pokemonStatistics: PokemonStatistic;
  createdBy: CreatedBy;
  categories: PokemonCategory[];
  closingDate: Date;
  description: string;
  abilities: PokemonAbility[];
  types: PokemonTypes[];
  status: Status;
  prevEvolution:  PokemonDetail;
  nextEvolution: PokemonDetail;
}

export interface PokemonDetailResponse {
  body: PokemonDetail;
}

export interface PokemonResponse {
  body: PokemonResponseBody;
}

export interface PokemonResponseBody {
  results: Pokemon[];
  paginator: Paginator;
}

export interface PokemonAbility extends Base {
  name: string;
}

export interface PokemonTypes extends Base {
  name: string;
}

export interface PokemonCategory extends Base {
  name: string;
}

export interface PokemonRequestBody {
  name: string;
  isLegendary: boolean;
  generation: number;
  weight: number;
  types: string[];
  pokedexNumber: number;
  height: number;
  abilities: string[];
  description: string;
  categories: string[];
  pokemonStatistics: {
    attack: number;
    defense: number;
    hp: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  },
  prevEvolution: PokemonDetail;
  nextEvolution: PokemonDetail;
}
