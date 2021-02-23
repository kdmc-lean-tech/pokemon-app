import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-outgoing-message',
  templateUrl: './outgoing-message.component.html',
  styleUrls: ['./outgoing-message.component.scss', '../chat.component.scss']
})
export class OutgoingMessageComponent implements OnInit {
  @Input() message: Message;
  constructor() { }

  ngOnInit(): void {
  }

}
