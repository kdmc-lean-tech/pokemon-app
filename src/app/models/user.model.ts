import { Avatar } from './avatar.model';
import { Base } from './base.model';
import { Role } from './role.model';

export interface User extends Base {
  name: string;
  email: string;
  password: string;
  roleId: Role;
  online: boolean;
  avatar?: Avatar;
}

export interface UserChat {
  _id: string;
  name: string;
  online: boolean;
  totalMessages: number;
  avatar?: Avatar;
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

export interface UserProfileBody {
  name: string;
}
