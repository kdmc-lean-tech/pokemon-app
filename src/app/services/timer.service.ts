import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Pokemon, PokemonWithRemainingTime } from '../models/pokemon.model';
import { calculateRemainingTime } from '../shared/utils/calculateRemainingTime';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private pokemons: PokemonWithRemainingTime[];
  private nLivePokemons: number;

  constructor() { }

  public coutdown(pokemons: Pokemon[]): Observable<PokemonWithRemainingTime[]> {
    this.pokemons = JSON.parse(JSON.stringify(pokemons));
    return timer(0, 1000)
      .pipe(
        map(this.setRemainingTime),
        takeWhile(() => this.nLivePokemons > 0, true)
      );
  }

  private setRemainingTime = (): PokemonWithRemainingTime[] => {
    this.nLivePokemons = 0;
    this.pokemons?.forEach(pokemon => {
      if (pokemon.status.name === 'PENDING') {
        pokemon.remainingTime = calculateRemainingTime(new Date(pokemon.closingDate));
        if (pokemon.remainingTime) {
          this.nLivePokemons++;
        }
      }
    });
    return this.pokemons;
  }
}
