import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserChat } from '../../../models/user.model';
import { ChatService } from '../../../services/chat.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.model';
import { SessionService } from '../../../services/session.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.scss', '../chat.component.scss']
})
export class SidebarChatComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public users: UserChat[];
  public userSelected: string;

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>,
    private sessionService: SessionService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select('chat').subscribe(({ users }) => {
        this.users = users;
      })
    );
  }

  public setUserChat(to: string) {
    this.userSelected = to;
    this.chatService.joinChat();
    this.getMessages(to);
  }

  public getMessages(to: string) {
    this.messageService.getMessages(to)
    .subscribe(messages => {
      this.messageService.messages.next({ userSelected: to, messages });
    }, err => {
      this.messageService.messages.next({ userSelected: to, messages: [] });
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.messageService.messages.next({ userSelected: null, messages: [] });
  }
}
