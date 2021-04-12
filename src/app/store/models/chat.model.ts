import { UserChat } from '../../models/user.model';

export interface ChatState {
  users: UserChat[];
  page: number;
}
