import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.model';
import { Subscription } from 'rxjs';
import { loadPokemons } from '../../../store/actions/pokemons.actions';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  public pokemons: Pokemon[];
  private subscriptions = new Subscription();
  public columns: string[] = ['pokedex', 'name', 'generation', 'created', 'date'];
  public dataSource: MatTableDataSource<Pokemon>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.getPokemons();
  }

  public getPokemons() {
    this.subscriptions.add(
      this.store.subscribe(({ pokemons }) => {
        this.pokemons = pokemons.pokemons;
        this.dataSource.data = this.pokemons;
      }),
    );
    this.store.dispatch(loadPokemons());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
