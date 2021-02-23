import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGateway } from '../shared/constants/api-gateway.constants';
import { PokemonFilter } from '../store/models/pokemons.model';
import { PokemonResponse, PokemonAbility, PokemonTypes } from '../models/pokemon.model';
import { BodyResponse } from '../models/response.model';
import { pluck } from 'rxjs/operators';

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
      .set('search', `${search}`);

    if (filters.sort) {
      const sortType = `{${sort.columnName}:${sort.sortType}}`;
      params = params.set('sort', sortType);
    }
    return this.http.get<PokemonResponse>(url, { params });
  }

  public getPokemonAbilities(): Observable<BodyResponse<PokemonAbility>> {
    const url = `${ ApiGateway.POKEMON_ABILITIES }`;
    return this.http.get<BodyResponse<PokemonAbility>>(url)
      .pipe(
        pluck('body')
      );
  }

  public getPokemonTypes(): Observable<BodyResponse<PokemonTypes>> {
    const url = `${ ApiGateway.POKEMON_TYPES }`;
    return this.http.get<BodyResponse<PokemonTypes>>(url)
      .pipe(
        pluck('body')
      );
  }
}
