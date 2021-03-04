import { SocketNameSpace } from '../classes/socket-namespace';
import { environment } from '../../../environments/environment';

export type NameSpaceType = 'chat';

export const setNameSpaceConfig = (namespace: NameSpaceType, token: string) => new SocketNameSpace({
  url: `${environment.API_DOMAIN_SOCKETS}/${namespace}`,
  options: {
    query: {
      token
    }
  }
});
