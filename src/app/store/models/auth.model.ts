import { User } from '../../models/user.model';

export interface AuthState {
  user: User;
  token: string;
}
