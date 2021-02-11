import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private helper: JwtHelperService;
  constructor() { 
    this.helper = new JwtHelperService();
  }

  get isLoggedIn(): boolean {
    const token = this.getToken();
    return this.helper.isTokenExpired(token);
  }

  public setSessionData(user: User, token: string) {
    localStorage.setItem('USER', JSON.stringify(user));
    localStorage.setItem('TOKEN', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('TOKEN');
  }

  public clearData() {
    localStorage.removeItem('USER');
    localStorage.removeItem('TOKEN');
  }
}
