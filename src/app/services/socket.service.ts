import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketNameSpace } from '../shared/classes/socket-namespace';
import { environment } from '../../environments/environment';
import { SessionService } from '../services/session.service';
import { CONNECT_EVENT, DISCONNECT_EVENT } from '../shared/constants/socket-events.constants';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public connect: Observable<null>;
  public disconnect: Observable<null>;

  constructor(
    private socket: Socket,
    private sessionService: SessionService
  ) {
    this.connect = this.socket.fromEvent(CONNECT_EVENT);
    this.disconnect = this.socket.fromEvent(DISCONNECT_EVENT);
  }
}
