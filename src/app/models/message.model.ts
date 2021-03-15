import { User } from '../models/user.model';
import { Base } from './base.model';

export interface Message extends Base {
  message: string;
  of: User;
  to: User;
  seen: boolean;
}

export interface ChatMessage {
  message: string;
  of: string;
  to: string;
}
