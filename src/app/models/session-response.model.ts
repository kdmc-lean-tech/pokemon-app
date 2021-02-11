import { User } from './user.model';

export interface SessionResponse {
  body: SessionBodyResponse;
}

interface SessionBodyResponse {
  token: string;
  user: User;
}
