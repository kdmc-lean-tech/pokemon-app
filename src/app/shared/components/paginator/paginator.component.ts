import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() optionsPaginator = [5, 10, 15, 20];
  @Input() numButtons = 2;
  @Input() len: number;
  @Output() pageEmitter = new EventEmitter<{ page: number, pageSize: number, len: number }>();
  public numPages: number;
  public arrayPages: number[] = [];

  constructor() {
  }

  ngOnChanges() {
    this.calcPagination();
  }

  ngOnInit() {
  }

  private calcPagination() {
    this.calcNumPages(this.pageSize);
    this.arrayPages = this.generateNumPages(Number(this.page));
  }

  public calcNumPages(pageSize: number) {
    this.numPages = Math.ceil(this.len / pageSize);
    this.pageSize = pageSize;
  }

  private getNumsRight(page: number) {
    let max = 0;
    if (page >= this.numPages) {
      max = this.numPages;
    }
    if (this.numPages <= this.numButtons) {
      max = this.numPages;
    }
    if (page <= this.numButtons) {
      max = this.numButtons * 2 + 1;
    }
    if (page > this.numButtons) {
      max = page + this.numButtons;
    }
    if (max > this.numPages) {
      max = this.numPages;
    }
    return max;
  }

  private getNumsLeft(page: number) {
    let min = 0;
    page <= this.numButtons ? (min = 1) : (min = page - this.numButtons);
    return min;
  }

  private generateNumPages(page: number) {
    const arr = [];
    for (
      let k = this.getNumsLeft(Number(page));
      k <= this.getNumsRight(Number(page));
      k++
    ) {
      arr.push(k);
    }
    this.calcNumPages(this.pageSize);
    return arr;
  }

  private identifyMaxPage(page: number) {
    if (page >= this.numPages) {
      return this.numPages;
    } else {
      return page;
    }
  }

  private identifyMinPage(page: number) {
    if (page < 1) {
      return (page = 1);
    } else {
      return page;
    }
  }

  public goToPage(page: number) {
    this.page = page;
    this.arrayPages = this.generateNumPages(page);
    this.pageEmitter.emit({page, pageSize: this.pageSize, len: this.len});
  }

  public gotoInitialPage() {
    this.page = 1;
    this.arrayPages = this.generateNumPages(1);
    this.pageEmitter.emit({page: 1, pageSize: this.pageSize, len: this.len});
  }

  public gotoEndPage() {
    this.page = this.numPages;
    this.arrayPages = this.generateNumPages(this.numPages);
    this.pageEmitter.emit({page: this.numPages, pageSize: this.pageSize, len: this.len});
  }

  public next() {
    this.page += 1;
    this.arrayPages = this.generateNumPages(this.page);
    this.pageEmitter.emit({page: this.identifyMaxPage(this.page), pageSize: this.pageSize, len: this.len});
  }

  public prev() {
    this.page -= 1;
    this.arrayPages = this.generateNumPages(this.page);
    this.pageEmitter.emit({page: this.identifyMinPage(this.page), pageSize: this.pageSize, len: this.len});
  }
}
