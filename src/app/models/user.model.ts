import { Base } from './base.model';
import { Role } from './role.model';

export interface User extends Base {
  name: string;
  email: string;
  password: string;
  roleId: Role;
  online: boolean;
}

export interface UserChat extends Base {
  name: string;
  online: boolean;
  totalMessages: number;
}

export interface CreatedBy {
  _id: string;
  name: string;
}

export interface UserRequestBody {
  name: string;
  password: string;
  email: string;
}

export interface JoinChat {
  of: string;
  to: string;
}
