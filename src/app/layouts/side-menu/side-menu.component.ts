import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models/app.model';
import { Modules } from '../../models/role.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy  {
  public menu: Modules[] = [];
  private subscriptions = new Subscription();

  constructor(
    public socketService: SocketService,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select('auth').subscribe(({ user }) => {
        this.menu = user?.roleId.modules;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
