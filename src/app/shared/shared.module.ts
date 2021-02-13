import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortIndicatorComponent } from './components/sort-indicator/sort-indicator.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    InputFieldComponent,
    PaginatorComponent,
    SortIndicatorComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    FlexLayoutModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    FlexModule,
    FlexLayoutModule,
    InputFieldComponent,
    PaginatorComponent,
    SortIndicatorComponent,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent
  ]
})
export class SharedModule { }
