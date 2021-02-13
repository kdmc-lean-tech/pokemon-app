import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionResponse } from '../models/session-response.model';
import { tap } from 'rxjs/operators';
import { ApiGateway } from 'src/app/shared/constants/api-gateway.constants';
import { UserRequestBody } from '../models/user.model';

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
    const url = `${ApiGateway.AUTH}/login`;
    const body = {
      email,
      password
    }
    return this.http.post<SessionResponse>(`${url}`, body)
      .pipe(
        tap(({ body }) => {
          const { user, token } = body;
          this.sessionService.setSessionData(user, token);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  public logout() {
    this.sessionService.clearData();
  }

  public recoveryPassword(email: string): Observable<any> {
    const url = `${ApiGateway.AUTH}/forgot-password`;
    const body = { email };
    return this.http.post<any>(url, body);
  }

  public changePassword(password: string, email: string): Observable<any> {
    const headers = new HttpHeaders({
      password
    });
    const url = `${ApiGateway.AUTH}/change-password`;
    const body = { email };
    return this.http.post<any>(url, body, { headers });
  }

  public register(body: UserRequestBody): Observable<SessionResponse> {
    const url = `${ApiGateway.AUTH}/register`;
    return this.http.post<SessionResponse>(url, body);
  }

  public activateUser(token: string): Observable<any> {
    const url = `${ApiGateway.AUTH}/activate`;
    const headers = new HttpHeaders({
      token
    });
    return this.http.get<any>(url, { headers });
  }
}
