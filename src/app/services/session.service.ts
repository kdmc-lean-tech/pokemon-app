import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../models/role.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app.model';
import { setUser } from '../store/actions/auth.actions';
import { setPokemons } from 'src/app/store/actions/pokemons.actions';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private helper: JwtHelperService;

  constructor(private store: Store<AppState>) {
    this.helper = new JwtHelperService();
    const token = this.getToken();
    const user = this.getUser();
    if (token && user) {
      this.store.dispatch(setUser({ token, user }));
    }
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
    this.setAuthInStore();
  }

  public getToken(): string | null {
    return localStorage.getItem('TOKEN');
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('USER'));
  }

  public setAuthInStore() {
    const token = this.getToken();
    const user = JSON.parse(localStorage.getItem('USER'));
    this.store.dispatch(setUser({ user, token }));
  }

  public clearStore() {
    this.store.dispatch(setUser({ token: null, user: null }));
    this.store.dispatch(setPokemons({ pokemons: [], len: 0 }));
  }

  public clearData() {
    localStorage.removeItem('USER');
    localStorage.removeItem('TOKEN');
    this.clearStore();
  }
}
