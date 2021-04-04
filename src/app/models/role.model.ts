import { Base } from './base.model';

export interface Role extends Base {
  name: string;
  modules: Modules[];
}

export interface Modules extends Base{
  name: string;
  label: string;
  icon: string;
  path: string;
}
