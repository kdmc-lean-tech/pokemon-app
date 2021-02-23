import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-incoming-message',
  templateUrl: './incoming-message.component.html',
  styleUrls: ['./incoming-message.component.scss', '../chat.component.scss']
})
export class IncomingMessageComponent implements OnInit {
  @Input() message: Message;
  constructor() { }

  ngOnInit(): void {
  }

}
