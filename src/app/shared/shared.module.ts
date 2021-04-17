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
import { BubbleChatComponent } from './components/bubble-chat/bubble-chat.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatRadioModule } from '@angular/material/radio';
import { PokemonCarouselComponent } from './components/pokemon-carousel/pokemon-carousel.component';
import { PermissionDirective } from './directives/permission.directive';
import { TimeDisplayComponent } from './components/time-display/time-display.component';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';


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
    FileUploadComponent,
    BubbleChatComponent,
    PokemonCarouselComponent,
    PermissionDirective,
    TimeDisplayComponent,
    ProfileDialogComponent,
    ColumnChartComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    FlexLayoutModule,
    IvyCarouselModule,
    MatRadioModule,
    MatDialogModule,
    NgApexchartsModule
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
    FileUploadComponent,
    BubbleChatComponent,
    IvyCarouselModule,
    MatRadioModule,
    PokemonCarouselComponent,
    PermissionDirective,
    TimeDisplayComponent,
    MatDialogModule,
    InfiniteScrollModule,
    NgApexchartsModule,
    MatProgressSpinnerModule,
    ColumnChartComponent
  ]
})
export class SharedModule { }
