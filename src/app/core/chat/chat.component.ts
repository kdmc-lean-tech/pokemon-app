import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  JOIN_ROOM_EVENT,
  USERS_ROOM
} from '../../shared/constants/socket-events.constants';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
  }

  public searchUsers($event) {
    this.chatService.chatNameSpaceProvider.value.emit(JOIN_ROOM_EVENT, {
      room: USERS_ROOM,
      search: $event ? $event : ''
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
