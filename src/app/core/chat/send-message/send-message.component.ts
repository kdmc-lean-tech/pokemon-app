import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { UserRtService } from '../../../services/user-rt.service';
import { ChatService } from '../../../services/chat.service';
import { editorConfig } from '../../../shared/constants/global.constants';
import { SessionService } from '../../../services/session.service';
import { ChatMessage } from '../../../models/message.model';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss', '../chat.component.scss']
})
export class SendMessageComponent implements OnInit {
  public form: FormGroup;
  private subscriptions = new Subscription();
  public chatMessage: ChatMessage;
  public editorConfig = editorConfig;

  constructor(
    private fb: FormBuilder,
    private userRtService: UserRtService,
    private chatService: ChatService,
    private sessionService: SessionService
  ) { }

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
          this.chatService.setChat,
          this.form.valueChanges
        ]
      ).subscribe(([userSelected, { message }]) => {
        if (userSelected) {
          this.chatMessage = {
            to: userSelected,
            message,
            of: this.sessionService.getUser()?._id
          };
        }
      })
    );
  }

  public onSubmit() {
    if (this.chatMessage) {
      this.userRtService.sendMessage(this.chatMessage);
      this.form.reset();
    }
  }
}
