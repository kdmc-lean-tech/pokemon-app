import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { JOIN_ROOM_EVENT, SET_CHAT_ROOM } from '../shared/constants/socket-events.constants';
import { BehaviorSubject } from 'rxjs';
import { SocketNameSpace } from '../shared/classes/socket-namespace';
import { ChatMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chatNameSpaceProvider = new BehaviorSubject<SocketNameSpace>(null);

  constructor(
    public sessionService: SessionService
  ) {
  }

  public setNameSpace(socketNameSpace: SocketNameSpace) {
    this.chatNameSpaceProvider.next(socketNameSpace);
  }

  public joinChat() {
    this.chatNameSpaceProvider.value.emit(JOIN_ROOM_EVENT,
      {
        room: SET_CHAT_ROOM
      });
  }

  public sendMessage(event: string, chatMessage: ChatMessage) {
    this.chatNameSpaceProvider.value.emit(event, { newMessage: chatMessage, room: SET_CHAT_ROOM });
  }
}
