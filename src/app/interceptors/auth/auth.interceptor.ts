import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { SessionService } from '../../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private sessionService: SessionService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.indexOf(environment.API_DOMAIN) === 0 && this.sessionService.isLoggedIn) {
      const token = this.sessionService.getToken();
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedReq);
    }
    return next.handle(request);
  }
}
