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
  PRIVATE_MESSAGE_EVENT
} from '../shared/constants/socket-events.constants';
import { removeTheSameModel } from '../shared/utils/filters.utils';
import { setUsers } from '../store/actions/chat.actions';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message.model';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../services/message.service';


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
    private messageService: MessageService
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
        this.store.dispatch(setSocketStatus({ online: true }));
      })
    );
    this.subscriptions.add(
      this.socketService.disconnect.subscribe(() => {
        this.store.dispatch(setSocketStatus({ online: false }));
      })
    );
    this.chatNameSpace.emit(JOIN_ROOM_EVENT, {
      room: USERS_ROOM,
      search: ''
    });
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(CONNECT_EVENT).subscribe(() => {
        this.chatService.chatNameSpaceProvider.next(this.chatNameSpace);
      })
    );
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(GET_USERS_EVENT)
        .pipe(
          map((users: UserChat[]) =>
          removeTheSameModel(users, this.sessionService.getUser()._id))
        )
        .subscribe((users: UserChat[]) => {
          this.store.dispatch(setUsers({ users }));
        })
    );
    this.subscriptions.add(
      this.chatNameSpace.fromEvent(PRIVATE_MESSAGE_EVENT)
        .subscribe((newMessage: any) => { // TODO: Pending type this........
          if (newMessage.to._id === this.sessionService.getUser()._id) {
            this.toastr.info(`${ newMessage.message }`, `${ newMessage.of.name } has just written to you:`);
            // TODO: Pending insert newMessage to corresponding user.....
          }
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
