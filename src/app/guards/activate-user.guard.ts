import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateUserGuard implements CanActivate {

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = next.paramMap.get('token');
      if (this.decodedToken(token)) {
        return true;
      }
      this.router.navigate(['auth']);
      return false;
  }

  private decodedToken(token: string): boolean {
    const helper = new JwtHelperService();
    try {
      const exp = helper.isTokenExpired(token);
      if (exp) {
        this.notificationService.showWarning('The time to change the password has passed.');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      this.notificationService.showError('It is not a valid link.');
    }
  }
}
