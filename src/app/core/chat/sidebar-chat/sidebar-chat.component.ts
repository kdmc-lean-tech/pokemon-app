import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRtService } from '../../../services/user-rt.service';
import { UserChat } from '../../../models/user.model';
import { ChatService } from '../../../services/chat.service';

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
    private userRtService: UserRtService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.userRtService.getUsers();
    this.subscriptions.add(
      this.userRtService.users.subscribe(users => {
        this.users = users;
      })
    );
  }

  public setUserChat(to: string) {
    this.userSelected = to;
    this.chatService.setUserChat(to);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
