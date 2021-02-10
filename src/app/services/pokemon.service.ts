import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGateway } from '../shared/constants/api-gateway.constants';
import { PokemonFilter } from '../store/models/pokemons.model';
import { PokemonResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  public getPokemons(filters?: PokemonFilter): Observable<PokemonResponse> {
    const url = `${ ApiGateway.POKEMONS }`;
    const { page, itemPerPage, search } = filters;
    const params = new HttpParams()
      .set('page', `${page}`)
      .set('itemPerPage', `${itemPerPage}`)
      .set('search', `${search}`)
      .set('sort', `{name: 1}`)
    return this.http.get<PokemonResponse>(url, { params });
  }
}
