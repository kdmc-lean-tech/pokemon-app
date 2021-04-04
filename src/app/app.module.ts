import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, effects } from './store/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { httpInterceptorProviders } from './interceptors/index';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { RolesComponent } from './admin/roles/roles.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { TypesComponent } from './admin/types/types.component';
import { AbilitiesComponent } from './admin/abilities/abilities.component';
import { UsersComponent } from './admin/users/users.component';

const config: SocketIoConfig = { url: environment.API_DOMAIN_SOCKETS, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    CategoriesComponent,
    TypesComponent,
    AbilitiesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects),
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot(),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
