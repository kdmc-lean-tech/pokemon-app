import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public username: string;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.username = this.sessionService.getUser().name;
  }

  public logout() {
    this.authService.logout();
  }
}
