import { User } from './user.model';

export interface SessionResponse {
  body: SessionBodyResponse;
}

interface SessionBodyResponse {
  token: string;
  user: User;
}

export interface DecodedToken {
  payload:  DacodedTokenPayload;
  exp: number;
  iat: number;
}

interface DacodedTokenPayload {
  email: string;
}
