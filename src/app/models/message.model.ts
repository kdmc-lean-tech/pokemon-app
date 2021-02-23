import { Base } from './base.model';

export interface Message extends Base {
  message: string;
  of: string;
  to: string;
}

export interface ChatMessage {
  message: string;
  of: string;
  to: string;
}
