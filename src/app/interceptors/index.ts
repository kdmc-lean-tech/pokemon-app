import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'src/app/interceptors/loading/loading.interceptor';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './error/error.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
];
