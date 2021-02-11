import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [
    InputFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    FlexModule,
    FlexLayoutModule,
    InputFieldComponent,
  ]
})
export class SharedModule { }
