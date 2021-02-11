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
    const { page, itemPerPage, search, sort } = filters;
    let params = new HttpParams()
      .set('page', `${page}`)
      .set('itemPerPage', `${itemPerPage}`)
      .set('search', `${search}`)

    if (filters.sort) {
      const sortType = `{${sort.columnName}:${sort.sortType}}`;
      params = params.set('sort', sortType);
    }
    return this.http.get<PokemonResponse>(url, { params });
  }
}
