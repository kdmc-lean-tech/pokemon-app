import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ApiGateway } from '../shared/constants/api-gateway.constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  public getMessages(of: string): Observable<any[]> {
    const url = `${ApiGateway.MESSAGES}`;
    return this.http.get<any[]>(`${url}/${of}`).pipe(
      pluck('body'),
    );
  }
}
