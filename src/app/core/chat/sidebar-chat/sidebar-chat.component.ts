import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserChat } from '../../../models/user.model';
import { ChatService } from '../../../services/chat.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.model';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message.model';
import { JOIN_ROOM_EVENT, USERS_ROOM } from '../../../shared/constants/socket-events.constants';
import { NgScrollbar } from 'ngx-scrollbar';
import { resetUsers } from 'src/app/store/actions/chat.actions';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.scss', '../chat.component.scss']
})
export class SidebarChatComponent implements OnInit, OnDestroy {
  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar;
  private subscriptions = new Subscription();
  public users: UserChat[];
  public userSelected: string;

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.searchUsers('');
    this.subscriptions.add(
      this.store.select('chat').subscribe(({ users }) => {
        if (users) {
          this.users = users;
        }
      })
    );
  }

  public setUserChat(to: string) {
    this.userSelected = to;
    this.chatService.joinChat();
    this.getMessages(to);
  }

  public getMessages(to: string) {
    this.messageService.getMessages(to, 1)
    .subscribe(messages => {
      if (messages.filter(m => m.seen === false).length > 0) {
        this.seenMessages(messages, to);
      }
      this.messageService.messages.next({ userSelected: to, messages });
    }, err => {
      this.messageService.messages.next({ userSelected: to, messages: [] });
    });
  }

  private seenMessages(messages: Message[], to) {
    const messageIds = messages.map(
      m => {
        if (m.of._id === to) {
          return m._id;
        }
      }
    );
    this.chatService.seeMessage(messageIds, to);
  }

  public searchUsers($event: string) {
    this.chatService.chatNameSpaceProvider.value?.emit(JOIN_ROOM_EVENT, {
      room: USERS_ROOM,
      search: $event ? $event : ''
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.messageService.messages.next({ userSelected: null, messages: [] });
    this.store.dispatch(resetUsers());
  }
}
