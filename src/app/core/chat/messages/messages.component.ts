import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { UserRtService } from '../../../services/user-rt.service';
import { SessionService } from '../../../services/session.service';
import { Message } from '../../../models/message.model';
import { ChatService } from '../../../services/chat.service';
import { MessageService } from '../../../services/message.service';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss', '../chat.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions = new Subscription();
  public activeChat = false;
  public messages: Message[] = [];
  @ViewChild('scrollable') scrollable: NgScrollbar;
  @ViewChild('endOfMessages') endOfMessages: ElementRef;

  constructor(
    private userRtService: UserRtService,
    public sessionService: SessionService,
    private chatService: ChatService,
    private messageService: MessageService
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.chatService.setChat.subscribe(userSelected => {
        this.activeChat = userSelected ? true : false;
        this.activeChat ? this.getMessages(userSelected) : this.messages = [];
      })
    );

    this.subscriptions.add(
      combineLatest(
        [
          this.userRtService.personalMessage,
          this.chatService.setChat
        ]
      ).subscribe(([newMessage, userSelected]) => {
        if (
          newMessage.of === userSelected
          ||
          newMessage.to === userSelected
        ) {
          this.messages.push(newMessage);
          this.scrollable.scrollToElement(this.endOfMessages);
        }
      })
    );
  }

  public getMessages(userSelected: string) {
    this.messageService.getMessages(userSelected)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
