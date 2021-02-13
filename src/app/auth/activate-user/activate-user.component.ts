import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ActivateUserComponent implements OnInit {
  public message: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateUser();
  }

  private activateUser() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    this.authService.activateUser(token)
      .subscribe(() => {
        this.message = 'Excellent, your user is activated, please click on the button below to login.';
      }, err => {
        this.message = 'An error occurred while activating your user, please contact the administrator.';
      });
  }

  public goToLogin() {
    this.router.navigate(['auth']);
  }
}
