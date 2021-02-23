import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

const CONNECT_EVENT = 'connect';
const DISCONNECT_EVENT = 'disconnect';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public connect: Observable<null>;
  public disconnect: Observable<null>;

  constructor(public socket: Socket) {
    this.connect = this.socket.fromEvent(CONNECT_EVENT);
    this.disconnect = this.socket.fromEvent(DISCONNECT_EVENT);
  }
}
