import { environment } from '../../../environments/environment';

const API_URL = `${ environment.API_DOMAIN }`;

export class ApiGateway {
  public static readonly POKEMONS = `${API_URL}/pokemon`;
}
