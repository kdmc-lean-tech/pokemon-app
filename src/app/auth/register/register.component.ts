import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { emailValidator } from '../../shared/validators/form-validators.utils';
import { UserRequestBody } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  get password() {
    return this.form.get('password')
  }

  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }

  private createForm() {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, emailValidator]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  public onSubmit() {
    const body: UserRequestBody = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    }
    this.authService.register(body)
      .subscribe(() => {
        this.notificationService.showSuccess(`
          User created correctly, please check the email to continue with the account activation.
        `);
        this.router.navigate(['auth']);
      });
  }
}
