import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  public searchValue = '';
  private lastEmittedValue: string;
  @Input() placeholder = 'Search';
  @Input() set value(value: string) {
    this.searchValue = value || '';
    this.lastEmittedValue = this.searchValue;
  }
  @Output() emitValue = new EventEmitter<string>();

  public onDebouncedInput(value: string): void {
    if (value !== this.lastEmittedValue) {
      this.emitValue.emit(value);
      this.lastEmittedValue = value;
    }
  }

  ngOnInit() {
  }
}
