import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadingConfiguration } from '../shared/constants/global.constants';
import { setSocketStatus } from '../store/actions/socket.actions';
import { AppState } from '../store/models/app.model';
import { SocketService } from '../services/socket.service';
import { Socket } from 'ngx-socket-io';
import { SocketNameSpace } from '../shared/classes/socket-namespace';
import { setNameSpaceConfig } from '../shared/constants/namespaces.constants';
import { SessionService } from '../services/session.service';
import { map } from 'rxjs/operators';
import { UserChat } from '../models/user.model';
import {
  JOIN_ROOM_EVENT,
  USERS_ROOM,
  CONNECT_EVENT,
  GET_USERS_EVENT,
  PRIVATE_MESSAGE_EVENT,
  UPDATE_USERS,
  MESSAGE_VIEWED,
  NEW_USER_CONNECTED_EVENT
} from '../shared/constants/socket-events.constants';
import { removeTheSameModel } from '../shared/utils/filters.utils';
import { resetUsers, setSocketUser, setUsers } from '../store/actions/chat.actions';
import { ChatService } from '../services/chat.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../models/message.model';


@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('snav ') snav: MatDrawer;
  private subscriptions = new Subscription();
  public isLoading = false;
  public loadingConfiguration = loadingConfiguration;
  public chatNameSpace: SocketNameSpace;

  constructor(
    private store: Store<AppState>,
    private socketService: SocketService,
    private socket: Socket,
    private sessionService: SessionService,
    private chatService: ChatService,
    private toastr: ToastrService,
  ) {
    this.chatNameSpace = setNameSpaceConfig('chat', this.sessionService.getToken());
  }

  ngOnInit(): void {

    this.chatNameSpace.connect();

    this.subscriptions.add(
      this.store.select('auth').subscribe(({ token, user }) => {
        token && user ? this.connect() : this.disconnect();
      })
    );
    this.subscriptions.add(
      this.store.select('ui').subscribe(({ isLoading }) => {
        Promise.resolve(null).then(() => this.isLoading = isLoading);
      })
    );
    this.subscriptions.add(
      this.socketService.connect.subscribe(() => {
        this.chatNameSpace.emit('');
        this.store.dispatch(setSocketStatus({ online: true }));
      })
    );
    this.subscriptions.add(
      this.socketService.disconnect.subscribe(() => {
        this.store.dispatch(setSocketStatus({ online: false }));
      })
    );
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(CONNECT_EVENT).subscribe(() => {
        this.chatService.chatNameSpaceProvider.next(this.chatNameSpace);
      })
    );
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(UPDATE_USERS)
        .subscribe(() => {
          this.chatNameSpace.emit(JOIN_ROOM_EVENT, {
            room: USERS_ROOM,
            search: '',
            page: 1
          });
        }),
    );
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(GET_USERS_EVENT)
        .pipe(
          map((users: UserChat[]) => removeTheSameModel(users, this.sessionService.getUser()._id))
        )
        .subscribe((users: UserChat[]) => {
          this.store.dispatch(setUsers({ users }));
        })
    );
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(PRIVATE_MESSAGE_EVENT)
        .subscribe(({ message }: { message: Message }) => {
          if (message.to._id === this.sessionService.getUser()._id) {
            this.toastr.success(`has just written to you.....`, `${ message.of.name }`);
          }
        })
    );
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(MESSAGE_VIEWED)
        .subscribe((user: UserChat) => {
          this.store.dispatch(setSocketUser({ user }));
        })
    );
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      this.snav.open();
    });
  }

  public connect(): void {
    this.socket.connect();
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  ngOnDestroy() {
    this.disconnect();
    this.chatNameSpace.disconnect();
    this.subscriptions.unsubscribe();
  }
}
