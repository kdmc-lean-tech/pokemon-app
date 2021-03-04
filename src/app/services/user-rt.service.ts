import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserChat } from '../models/user.model';
import { ChatMessage, Message } from '../models/message.model';
import { SessionService } from '../services/session.service';
import {
  USERS_ROOM,
  JOIN_ROOM_EVENT,
  NEW_MESSAGE_EVENT
} from '../shared/constants/socket-events.constants';

@Injectable({
  providedIn: 'root'
})
export class UserRtService {
  public personalMessage: Observable<Message>;
  public newUserConnected: Observable<UserChat>;

  constructor(
    public sessionService: SessionService
    ) {
    }

  public getUsers(search) {
    // this.chatNameSpace.value.emit(JOIN_ROOM_EVENT, {
    //   room: USERS_ROOM,
    //   search: search ? search : ''
    // });
  }

  public sendMessage(chatMessage: ChatMessage) {
    // this.chatNameSpace.value.emit(NEW_MESSAGE_EVENT, chatMessage);
  }
}
