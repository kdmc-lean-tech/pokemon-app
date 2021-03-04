import { Component, OnDestroy, OnInit } from '@angular/core';
import { Menu } from '../../shared/models/menu.model';
import { menu } from '../../shared/constants/global.constants';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models/app.model';
import { setSocketStatus } from '../../store/actions/socket.actions';
import { UserChat } from '../../models/user.model';
import { setUsers } from '../../store/actions/chat.actions';
import { SessionService } from '../../services/session.service';
import {
  CONNECT_EVENT,
  DISCONNECT_EVENT,
  GET_USERS_EVENT,
  JOIN_ROOM_EVENT,
  USERS_ROOM
} from '../../shared/constants/socket-events.constants';
import { map } from 'rxjs/operators';
import { removeTheSameModel } from 'src/app/shared/utils/filters.utils';
import { SocketNameSpace } from 'src/app/shared/classes/socket-namespace';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy  {
  public menu: Menu[] = menu;
  private subscriptions = new Subscription();

  constructor(
    public socketService: SocketService,
    private store: Store<AppState>,
    private sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
