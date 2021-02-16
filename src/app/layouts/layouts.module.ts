import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NgxLoadingModule } from 'ngx-loading';
import { loadingConfiguration } from '../shared/constants/global.constants';


@NgModule({
  declarations: [
    LayoutsComponent,
    ToolbarComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    SharedModule,
    NgxLoadingModule.forRoot(loadingConfiguration)
  ]
})
export class LayoutsModule { }
