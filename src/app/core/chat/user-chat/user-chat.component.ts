import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserChat } from '../../../models/user.model';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss', '../chat.component.scss'],
})
export class UserChatComponent implements OnInit {
  @Input() user: UserChat;
  @Output() userSelected = new EventEmitter();
  @Input() active = false;

  constructor() { }

  ngOnInit(): void {
  }

  public userSelectedEmit(userSelected) {
    this.userSelected.emit(userSelected);
  }
}
