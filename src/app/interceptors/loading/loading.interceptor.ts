import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app.model';
import { setLoading } from 'src/app/store/actions/ui.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  private activeRequests = 0;

  constructor(
    private store: Store<AppState>,
  ) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.store.dispatch(setLoading({ isLoading: true }));
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.activeRequests--;
            if (this.activeRequests === 0) {
              this.store.dispatch(setLoading({ isLoading: false }));
            }
          }
        },
        error => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.store.dispatch(setLoading({ isLoading: false }));
          }
        }
      )
    );
  }
}
