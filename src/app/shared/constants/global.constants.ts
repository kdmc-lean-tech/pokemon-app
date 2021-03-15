import { AngularEditorConfig } from '@kolkov/angular-editor';
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

export const editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'undo',
      'redo',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
      'insertUnorderedList',
      'insertOrderedList',
      'heading',
      'fontName',
      'insertVideo',
    ]
  ]
};
