import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public connect: Observable<null>;
  public disconnect: Observable<null>;
  constructor(private socket: Socket) {
    this.connect = this.socket.fromEvent('connect');
    this.disconnect = this.socket.fromEvent('disconnect');
  }
}
