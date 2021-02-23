import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public setChat = new Subject<string>();
  constructor() { }

  public setUserChat(userSelected: string) {
    this.setChat.next(userSelected);
  }
}
