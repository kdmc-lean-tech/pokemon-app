import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGateway } from '../shared/constants/api-gateway.constants';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  public getPokemons(): Observable<any> {
    const url = `${ ApiGateway.POKEMONS }`;
    return this.http.get<any>(`${url}?search&itemPerPage=10&page=1&sort={name:%201,%20createdAt:%201}`);
  }
}
