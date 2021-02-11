import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder = '';
  public value = '';
  public disabled = false;
  onChange = (_: any) => {};
  onTouched = () => {};
  constructor() { }

  ngOnInit(): void {
  }

  public setValue(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: any): any {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): any {
    this.registerOnTouched = fn;
  }

  writeValue(value: string) {
    if (value) {
      this.value = value;
    } else {
      this.value = '';
    }
  }

  setDisabledState(disabled: boolean): any {
    this.disabled = disabled;
  }
}
