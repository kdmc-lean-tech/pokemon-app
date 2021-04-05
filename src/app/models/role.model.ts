import { Base } from './base.model';

export interface Role extends Base {
  name: string;
  modules: Modules[];
  permissions: Permissions[];
}

export interface Modules extends Base{
  name: string;
  label: string;
  icon: string;
  path: string;
}

export interface Permissions extends Base {
  name: string;
  codename: string;
}
