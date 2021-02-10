import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit, AfterViewInit {
  @ViewChild('snav ') snav: MatDrawer;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      this.snav.open();
    });
  }
}
