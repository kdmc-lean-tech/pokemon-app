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
  private page = 1;

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.searchUsers('');
    this.subscriptions.add(
      this.store.select('chat').subscribe(({ users, page }) => {
        if (users) {
          this.users = users;
          this.page = page;
        }
      })
    );
  }

  public setUserChat(to: string) {
    this.userSelected = to;
    this.chatService.joinChat();
    this.getMessages(to);
  }

  public getMessages(to: string, page = 1) {
    this.messageService.getMessages(to, page)
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

  public searchUsers($event: string, page = 1) {
    this.store.dispatch(resetUsers());
    if ($event.length > 0) {
      this.chatService.chatNameSpaceProvider.value?.emit(JOIN_ROOM_EVENT, {
        room: USERS_ROOM,
        search: $event ? $event : '',
        page
      });
    } else {
      this.page = 1;
      this.loadUsers(this.page);
    }
  }

  public loadUsers(page = 1) {
    this.chatService.chatNameSpaceProvider.value?.emit(JOIN_ROOM_EVENT, {
      room: USERS_ROOM,
      search: '',
      page
    });
  }

  public onScrollDown($event?) {
    this.page++;
    this.loadUsers(this.page);
  }

  public onUp($event?) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.messageService.messages.next({ userSelected: null, messages: [] });
    this.store.dispatch(resetUsers());
  }
}
