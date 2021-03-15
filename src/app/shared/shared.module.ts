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
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortIndicatorComponent } from './components/sort-indicator/sort-indicator.component';
import { ButtonComponent } from './components/button/button.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { SocketIndicatorComponent } from './components/socket-indicator/socket-indicator.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DebounceInputDirective } from './directives/debounce-input.directive';
import { NotifierComponent } from './components/notifier/notifier.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    InputFieldComponent,
    PaginatorComponent,
    SortIndicatorComponent,
    ButtonComponent,
    InputSearchComponent,
    SocketIndicatorComponent,
    DebounceInputDirective,
    NotifierComponent,
    FileUploadComponent
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
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    InputSearchComponent,
    SocketIndicatorComponent,
    AngularEditorModule,
    MatStepperModule,
    MatCheckboxModule,
    NgScrollbarModule,
    MatBadgeModule,
    FileUploadComponent
  ]
})
export class SharedModule { }
