import { AbstractControl, FormControl } from '@angular/forms';

export function emailValidator(control: AbstractControl) {
  // tslint:disable-next-line: max-line-length
  const regExp: RegExp = /^(([^<>()\[\]\\.,;:\s@'|={}`"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !regExp.test(control.value) ? { email: { message: `${control.value} is not a valid email` } } : null;
}

export const requiredFileType = (...typeFiles: string[]) => {
  return (control: FormControl): { message: string } | null => {
    const extensions = typeFiles.map(type => type);
    const file = control.value;
    const exist = extensions.find(ext => ext === file?.name.split('.')[1].toLowerCase());
    return exist ? null : { message: `The file extension is not valid.` };
  };
};
