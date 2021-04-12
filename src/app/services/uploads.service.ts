import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { ApiGateway } from '../shared/constants/api-gateway.constants';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  uploadUserAvatar(formData: FormData, userId = this.sessionService.getUser()._id): Observable<any> {
    const url = `${ ApiGateway.UPLOAD }/user/${userId}/avatar`;
    return this.http.post<any>(url, formData)
    .pipe(
      pluck('body')
    );
  }

  uploadPokemonAvatar(formData: FormData, pokemonId: string): Observable<any> {
    const url = `${ ApiGateway.UPLOAD }/pokemon/${pokemonId}/avatar`;
    return this.http.post<any>(url, formData);
  }
}
