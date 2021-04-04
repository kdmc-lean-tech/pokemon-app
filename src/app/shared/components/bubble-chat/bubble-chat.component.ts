import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-bubble-chat',
  templateUrl: './bubble-chat.component.html',
  styleUrls: ['./bubble-chat.component.scss']
})
export class BubbleChatComponent implements OnInit {
  @Input() message: Message;
  @Input() mode: 'incoming' | 'outgoing' = 'incoming';
  constructor() { }

  ngOnInit(): void {
  }

}
