import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pokemons: any;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  public getPokemons() {
    this.pokemonService.getPokemons()
      .subscribe(({ body }) => {
        this.pokemons = body.results;
      });
  }
}
