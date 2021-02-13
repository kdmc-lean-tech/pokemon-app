import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/models/session-response.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  private decodedToken: DecodedToken;
  private jwtService = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTokenAndExtractEmail();
    this.createForm();
  }

  get password() {
    return this.form.get('password')
  }

  get newPassword() {
    return this.form.get('newPassword')
  }

  private createForm() {
    this.form = this.fb.group({
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    }, {
      validators: this.verifyPassowrdValidator
    });
  }

  private verifyPassowrdValidator(group: FormGroup) {
    return group.get('password').value === group.get('newPassword').value
      ? null : { nonEqualPasswords : true };
  }

  private getTokenAndExtractEmail() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    this.decodedToken = this.jwtService.decodeToken(token);
  }

  public onSubmit() {
    const { payload } = this.decodedToken;
    const { email } = payload;
    this.authService.changePassword(this.password.value, email)
      .subscribe(() => {
        this.notificationService.showSuccess('Please check your email to validate the correct password change.');
        this.router.navigate(['auth']);
      });
  }
}
