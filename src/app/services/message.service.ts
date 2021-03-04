import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ApiGateway } from '../shared/constants/api-gateway.constants';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages = new BehaviorSubject<{ userSelected: string, messages: Message[] }>(
    { userSelected: null, messages: [] }
  );

  constructor(
    private http: HttpClient
  ) {}

  public getMessages(to: string): Observable<Message[]> {
    const url = `${ApiGateway.MESSAGES}`;
    return this.http.get<Message[]>(`${url}/${to}`).pipe(
      pluck('body'),
    );
  }

  public getMessageById(messageId: string): Observable<Message> {
    const url = `${ApiGateway.MESSAGES}/${messageId}`;
    return this.http.get<Message>(url).pipe(
      pluck('body'),
    );
  }
}
