import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role: Role = this.sessionService.role;
      const modules = role.modules;
      const moduleExist = modules.find(m => state.url.includes(m.path));
      if (!moduleExist) {
        this.router.navigate(['dashboard']);
        return false;
      }
      return true;
  }
}
