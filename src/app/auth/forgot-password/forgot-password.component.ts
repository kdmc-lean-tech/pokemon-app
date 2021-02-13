import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/form-validators.utils';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
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

  get email() {
    return this.form.get('email');
  }

  private createForm() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, emailValidator])
    });
  }

  public onSubmit() {
    const { email } = this.form.value;
    this.authService.recoveryPassword(email)
      .subscribe(() => {
        this.router.navigate(['auth']);
        this.notificationService.showSuccess('Please check your email to continue with the process.');
      }, err => {
        this.notificationService.showError(err.error.message);
      });
  }
}
