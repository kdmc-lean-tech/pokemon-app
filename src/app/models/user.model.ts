import { Base } from './base.model';
import { Role } from './role.model';

export interface User extends Base {
  name: string;
  email: string;
  password: string;
  roleId: Role;
}

export interface CreatedBy {
  _id: string;
  name: string;
}
