import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public getClientMessage(error: HttpErrorResponse): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.error.message ? error.error.message : error.error.toString();
  }

  public getClientStack(error: Error): string {
    return error.stack;
  }

  public getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

  public getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
