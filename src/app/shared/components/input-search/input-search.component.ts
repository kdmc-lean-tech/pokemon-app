import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {
  public searchValue = '';
  private lastEmittedValue: string;

  @Input() placeholder = 'Search';
  @Input() set value(value: string) {
    this.searchValue = value || '';
    this.lastEmittedValue = this.searchValue;
  }
  @Output() valueChanged = new EventEmitter<string>();

  public onDebouncedInput(value: string): void {
    if (value !== this.lastEmittedValue) {
      this.valueChanged.emit(value);
      this.lastEmittedValue = value;
    }
  }
}
