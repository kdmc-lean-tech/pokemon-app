import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private helper: JwtHelperService;
  constructor() {
    this.helper = new JwtHelperService();
  }

  get role(): Role {
    const user: User = JSON.parse(localStorage.getItem('USER'));
    return user.roleId;
  }

  get isLoggedIn(): boolean {
    const token = this.getToken();
    return token ?  true : false;
  }

  get tokenExpired(): boolean {
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
