import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ProfileDialogComponent
} from '../../shared/components/profile-dialog/profile-dialog.component';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public user: User;
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.subscriptions.add(
      this.store.select('auth').subscribe(({ user }) => {
        if (user) {
          this.user = user;
          this.cdr.detectChanges();
        }
      })
    );
  }

  public editProfile() {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '650px',
      data: this.user
    });
  }

  public logout() {
    this.authService.logout();
  }
}
