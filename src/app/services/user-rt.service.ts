import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { UserChat } from '../models/user.model';
import { Message } from '../models/message.model';
import { SessionService } from '../services/session.service';
import { map } from 'rxjs/operators';
import { removeTheSameModel } from 'src/app/shared/utils/filters.utils';

const GET_USERS_EVENT = 'users';
const PRIVATE_MESSAGE_EVENT = 'private-message';
const PERSONAL_MESSAGE_EVENT = 'personal-message';

@Injectable({
  providedIn: 'root'
})
export class UserRtService {
  public users: Observable<UserChat[]>;
  public personalMessage: Observable<Message>;

  constructor(
    private socket: Socket,
    private sessionService: SessionService
  ) {
    this.users = this.socket.fromEvent(GET_USERS_EVENT)
    .pipe(
      map((users: UserChat[]) => {
        const userId = this.sessionService.getUser()._id;
        return removeTheSameModel(users, userId);
      })
    );
    this.personalMessage = this.socket.fromEvent(PERSONAL_MESSAGE_EVENT);
  }

  public getUsers(search?: string) {
    this.socket.emit(GET_USERS_EVENT, search ? search : '');
  }

  public sendMessage(chatMessage) {
    this.socket.emit(PRIVATE_MESSAGE_EVENT, chatMessage);
  }
}
