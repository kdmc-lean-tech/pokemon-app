import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { emailValidator } from '../../shared/validators/form-validators.utils';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, emailValidator]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  public goToForgotPassword() {
    this.router.navigate(['auth/forgot-password']);
  }

  public goToRegister() {
    this.router.navigate(['auth/register']);
  }

  public onSubmit() {
    const { email, password } = this.form.value;
    this.authService.authenticate(email, password)
      .subscribe(
        () => {},
        err => {
          this.notificationService.showError('Email or password incorrect.');
      });
  }
}
