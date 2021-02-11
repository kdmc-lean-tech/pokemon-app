import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../../services/error.service';
import { NotificationService } from '../../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string;
        let stackTrace: string;
        if (error.status !== 404) {
          if (error.status >= 500 && error.status < 600) {
            message = this.errorService.getServerMessage(error);
            stackTrace = this.errorService.getServerStack(error);
          } else if (error.status >= 400 && error.status < 500) {
            message = this.errorService.getClientMessage(error);
            stackTrace = this.errorService.getClientStack(error);
          }
          this.notificationService.showError(message);
        }
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
