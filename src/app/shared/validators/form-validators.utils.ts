import { AbstractControl } from "@angular/forms";

export function emailValidator(control: AbstractControl) {
  // tslint:disable-next-line: max-line-length
  const regExp: RegExp = /^(([^<>()\[\]\\.,;:\s@'|={}`"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !regExp.test(control.value) ? { email: { message: `${control.value} is not a valid email` } } : null;
}
