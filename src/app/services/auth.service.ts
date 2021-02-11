import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionResponse } from '../models/session-response.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) { }

  public authenticate(email: string, password: string): Observable<SessionResponse> {
    const url = ``;
    const body = {
      email,
      password
    }
    return this.http.post<SessionResponse>(`${url}`, body)
      .pipe(
        tap(({ body }) => {
          const { user, token } = body;
          this.sessionService.setSessionData(user, token);
          this.router.navigate(['/']);
        })
      );
  }

  public logout() {
    this.sessionService.clearData();
  }
}
