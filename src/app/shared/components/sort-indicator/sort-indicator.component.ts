import { Component, Input, OnInit } from '@angular/core';
import { SortType } from '../../../models/filter.model';

@Component({
  selector: 'app-sort-indicator',
  templateUrl: './sort-indicator.component.html',
  styleUrls: ['./sort-indicator.component.scss']
})
export class SortIndicatorComponent implements OnInit {
  @Input() label: string;
  @Input() columnName: string;
  @Input() sort: { columnName: string, sortType: SortType };
  public sortType = SortType;
  constructor() { }

  ngOnInit(): void {
  }

}
