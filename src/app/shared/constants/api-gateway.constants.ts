import { environment } from '../../../environments/environment';

const API_URL = `${ environment.API_DOMAIN }`;

export class ApiGateway {
  public static readonly POKEMONS = `${API_URL}/pokemon`;
  public static readonly AUTH = `${API_URL}/auth`;
  public static readonly MESSAGES = `${API_URL}/messages`;
  public static readonly POKEMON_TYPES = `${API_URL}/pokemon-types`;
  public static readonly POKEMON_ABILITIES = `${API_URL}/pokemon-abilities`;
  public static readonly POKEMON_CATEGORIES = `${API_URL}/pokemon-categories`;
}
