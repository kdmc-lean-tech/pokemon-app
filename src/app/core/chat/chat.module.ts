import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { InboxPeopleComponent } from './inbox-people/inbox-people.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';
import { UserChatComponent } from './user-chat/user-chat.component';


@NgModule({
  declarations: [ChatComponent, InboxPeopleComponent, SearchBoxComponent, SidebarChatComponent, UserChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
