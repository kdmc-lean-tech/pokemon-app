import { Component, OnInit } from '@angular/core';
import { Menu } from '../../shared/models/menu.model';
import { menu } from '../../shared/constants/global.constants';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  public menu: Menu[] = menu;
  constructor() { }

  ngOnInit(): void {
  }

}
