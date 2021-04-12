import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ImageService } from '../../../services/image.service';
import { UploadsService } from '../../../services/uploads.service';
import { requiredFileType } from '../../../shared/validators/form-validators.utils';
import { User, UserProfileBody } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  public form: FormGroup;
  public previuosFile: FileReader;
  private subscriptions = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private uploadService: UploadsService,
    private imageService: ImageService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data) {
      this.populateForm(this.data);
    }
    this.listenFileUpload();
  }

  private createForm() {
    this.form = this.fb.group({
      name: new FormControl(null, [ Validators.required ]),
      file: new FormControl(null, [ Validators.required, requiredFileType('png', 'jpg', 'jpeg')]),
      fileReader: new FormControl(null)
    });
    this.file.disable();
  }

  private populateForm(user: User) {
    this.form.patchValue({
      name: user.name
    });
  }

  get file() {
    return this.form.get('file') as FormControl;
  }

  get fileReader() {
    return this.form.get('fileReader') as FormControl;
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public showPreviousImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file.value);
    reader.onload = (event: any) => {
      this.previuosFile = event.target.result;
      this.form.get('fileReader').setValue(this.previuosFile);
    };
  }

  public uploadAvatarUserImage(file: File, user: UserProfileBody, userId: string) {
    if (file) {
      this.imageService.compressFile(file, 0.5)
        .then((result) => {
          const fileFormData: FormData = this.imageService.convertBlobToFormData(result, file.name);
          this.saveUser(userId, user)
            .pipe(
              switchMap(user => {
                return this.uploadService.uploadUserAvatar(fileFormData, user._id);
              })
            ).subscribe(user => {
              this.setUserInStore(user);
            });
        });
    } else {
      this.saveUser(userId, user)
        .subscribe(user => {
          this.setUserInStore(user);
        });
    }
  }

  private setUserInStore(user: User) {
    const token = this.sessionService.getToken();
    this.sessionService.setSessionData(user, token);
    this.notificationService.showSuccess('User saved');
  }

  private saveUser(userId: string, user: UserProfileBody): Observable<any> {
    return this.authService.editProfile(userId, user);
  }

  private listenFileUpload() {
    this.subscriptions.add(
      this.file.valueChanges.pipe(
        first()
      ).subscribe(() => {
        this.file.enable();
      })
    );
    this.subscriptions.add(
      this.file.valueChanges.subscribe(file => {
        if (file) {
          this.showPreviousImage();
        }
      })
    );
  }

  public onSubmit() {
    const body = {
      name: this.name.value
    };
    this.uploadAvatarUserImage(this.file.value, body, this.data._id);
    this.closeDialog();
  }
}
