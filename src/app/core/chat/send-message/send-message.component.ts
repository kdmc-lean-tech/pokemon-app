import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { editorConfig } from '../../../shared/constants/global.constants';
import { SessionService } from '../../../services/session.service';
import { ChatMessage } from '../../../models/message.model';
import { MessageService } from '../../../services/message.service';
import { ChatService } from '../../../services/chat.service';
import { NEW_MESSAGE_EVENT } from '../../../shared/constants/socket-events.constants';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss', '../chat.component.scss']
})
export class SendMessageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subscriptions = new Subscription();
  public chatMessage: ChatMessage;
  public editorConfig = editorConfig;
  public userSelected: string;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private messageService: MessageService,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.listenActiveChat();
  }

  public createForm() {
    this.form = this.fb.group({
      message: [null, Validators.required]
    });
  }

  public listenActiveChat() {
    this.subscriptions.add(
      combineLatest(
        [
          this.messageService.messages,
          this.form.valueChanges
        ]
      ).subscribe(([{ userSelected }, form]) => {
        if (userSelected) {
          this.userSelected = userSelected;
          this.chatMessage = {
            of: this.sessionService.getUser()._id,
            to: userSelected,
            message: form.message
          };
        }
      })
    );
  }

  public onSubmit() {
    if (this.chatMessage) {
      this.chatService.sendMessage(NEW_MESSAGE_EVENT, this.chatMessage);
      this.form.reset();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
