import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonDetailState, PokemonState } from 'src/app/store/models/pokemons.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonCarouselService {
  public loadPokemons = new BehaviorSubject<PokemonDetailState>(null);
  constructor() { }

  public searchPokemons(pokemonState: PokemonDetailState) {
    this.loadPokemons.next(pokemonState);
  }
}
