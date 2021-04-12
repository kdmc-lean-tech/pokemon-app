import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getMessages(to: string, page = 1): Observable<Message[]> {
    const url = `${ApiGateway.MESSAGES}`;
    const params = new HttpParams()
      .set('page', `${ page }`)
      .set('itemPerPage', '10')
    return this.http.get<Message[]>(`${url}/${to}`, { params }).pipe(
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
