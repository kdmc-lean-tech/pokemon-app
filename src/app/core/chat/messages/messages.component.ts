import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { of, Subscription } from 'rxjs';
import { SessionService } from '../../../services/session.service';
import { Message } from '../../../models/message.model';
import { ChatService } from '../../../services/chat.service';
import { MessageService } from '../../../services/message.service';
import { NgScrollbar } from 'ngx-scrollbar';
import {
  GET_USERS_EVENT,
  PRIVATE_MESSAGE_EVENT
} from '../../../shared/constants/socket-events.constants';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss', '../chat.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions = new Subscription();
  public activeChat = false;
  public messages: Message[] = [];
  public userSelected: string;
  @ViewChild('scrollable') scrollable: NgScrollbar;
  @ViewChild('endOfMessages') endOfMessages: ElementRef;
  public durationInSeconds = 5;

  constructor(
    public sessionService: SessionService,
    private chatService: ChatService,
    private messageService: MessageService
  ) {
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.messageService.messages.subscribe(({ userSelected, messages }) => {
        if (userSelected) {
          this.userSelected = userSelected;
          this.messages = messages;
          this.scrollable.scrollToElement(this.endOfMessages);
        }
      })
    );
    this.subscriptions.add(
      this.chatService.chatNameSpaceProvider
        .pipe(
          switchMap((chatNameSpace) => {
            if (chatNameSpace) {
              return chatNameSpace.fromEvent(PRIVATE_MESSAGE_EVENT);
            } else {
              return of(undefined);
            }
          })
        ).subscribe((newMessage: Message) => {
          if (newMessage && this.userSelected) {
            this.verifyMessage(newMessage, this.userSelected);
          }
      })
    );
  }

  ngOnInit(): void {
  }

  public verifyMessage(newMessage: any, userSelected: string) {
    if (
      newMessage.of._id === userSelected
      ||
      newMessage.to._id === userSelected
      ) {
        this.messages.push(newMessage);
        this.scrollable.scrollToElement(this.endOfMessages);
        this.chatService.chatNameSpaceProvider.value.emit(GET_USERS_EVENT);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
