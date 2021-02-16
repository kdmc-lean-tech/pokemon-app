import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Menu } from '../models/menu.model';

export const menu: Menu[] = [
  {
    icon: 'dashboard',
    path: '/dashboard',
    name: 'dashboard',
    label: 'Dashboard'
  },
  {
    icon: 'pest_control_rodent',
    path: '/pokemon',
    name: 'pokemon',
    label: 'Pokemon'
  },
  {
    icon: 'account_circle',
    path: '/chat',
    name: 'chat',
    label: 'Chat'
  }
];

export const loadingConfiguration = {
  backdropBackgroundColour: 'rgba(248, 250, 251, 0.1)',
  backdropBorderRadius: '4px',
  primaryColour: 'rgb(0, 57, 120)',
  secondaryColour: '#ffffff',
  tertiaryColour: '#ffffff',
  fullScreenBackdrop: true,
  animationType: ngxLoadingAnimationTypes.circleSwish
};
