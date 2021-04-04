import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGateway } from '../shared/constants/api-gateway.constants';
import { PokemonFilter } from '../store/models/pokemons.model';
import {
  PokemonResponse,
  PokemonAbility,
  PokemonTypes,
  PokemonCategory,
  PokemonRequestBody,
  PokemonResponseBody,
  PokemonDetailResponse
} from '../models/pokemon.model';
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
    const url = `${ ApiGateway.POKEMON_ABILITIES }/all/abilities`;
    return this.http.get<BodyResponse<PokemonAbility>>(url)
      .pipe(
        pluck('body')
      );
  }

  public getPokemonTypes(): Observable<BodyResponse<PokemonTypes>> {
    const url = `${ ApiGateway.POKEMON_TYPES }/all/types`;
    return this.http.get<BodyResponse<PokemonTypes>>(url)
      .pipe(
        pluck('body')
      );
  }

  public getPokemonCategories(): Observable<BodyResponse<PokemonCategory>> {
    const url = `${ ApiGateway.POKEMON_CATEGORIES }/all/categories`;
    return this.http.get<BodyResponse<PokemonCategory>>(url)
      .pipe(
        pluck('body')
      );
  }

  public savePokemon(pokemon: PokemonRequestBody): Observable<any> {
    const url = `${ ApiGateway.POKEMONS }`;
    return this.http.post<any>(url, pokemon);
  }

  public searchPokemons(search = ''): Observable<PokemonResponseBody> {
    const url = `${ ApiGateway.POKEMONS }/search/pokemons`;
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<PokemonResponseBody>(url, { params })
      .pipe(
        pluck('body')
      );
  }

  public getPokemonById(pokemonId: string): Observable<PokemonDetailResponse> {
    const url = `${ ApiGateway.POKEMONS }/${ pokemonId }`;
    return this.http.get<PokemonDetailResponse>(url);
  }

  public editPokemon(pokemonId: string, pokemon: PokemonRequestBody): Observable<any> {
    const url = `${ ApiGateway.POKEMONS }/${pokemonId}`;
    return this.http.put<PokemonRequestBody>(url, pokemon);
  }
}
