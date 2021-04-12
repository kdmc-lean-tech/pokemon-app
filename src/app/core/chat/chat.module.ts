import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { InboxPeopleComponent } from './inbox-people/inbox-people.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { MessagesComponent } from './messages/messages.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { SharedModule } from '../../shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    ChatComponent,
    InboxPeopleComponent,
    SidebarChatComponent,
    UserChatComponent,
    MessagesComponent,
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
    ScrollingModule
  ]
})
export class ChatModule { }
