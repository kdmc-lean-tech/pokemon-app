import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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
import { UserChat } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app.model';
import { setSocketUser } from 'src/app/store/actions/chat.actions';

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
  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar;

  constructor(
    public sessionService: SessionService,
    private chatService: ChatService,
    private messageService: MessageService,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.messageService.messages.subscribe(({ userSelected, messages }) => {
        if (userSelected) {
          this.userSelected = userSelected;
          this.messages = messages;
          this.scrollbarRef.scrollTo({bottom: 0, duration: 800});
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
        ).subscribe((data: { message: Message, user: UserChat }) => {
          if (data) {
            const { user, message } = data;
            if (message && this.userSelected) {
            this.verifyMessage(message, this.userSelected);
            }
            if (user?._id !== this.sessionService.getUser()._id) {
              this.store.dispatch(setSocketUser({ user }));
              this.cdr.detectChanges();
            }
          }
      })
    );
  }

  ngOnInit(): void {
  }

  public verifyMessage(message: Message, userSelected: string) {
    if (
      message.of._id === userSelected
      ||
      message.to._id === userSelected
      ) {
        this.messages.push(message);
        this.scrollbarRef.scrollTo({bottom: 0, duration: 800});
        this.chatService.chatNameSpaceProvider.value.emit(GET_USERS_EVENT);
    }
  }

  public onScrollDown($event) {
    console.log('Down', $event);
  }

  public onUp($event) {
    console.log('Up', $event);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
