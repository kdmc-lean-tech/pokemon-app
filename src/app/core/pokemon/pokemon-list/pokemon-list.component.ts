import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.model';
import { Subscription } from 'rxjs';
import { loadPokemons, setPaginatorFilter } from '../../../store/actions/pokemons.actions';
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
  public page: number;
  public itemPerPage: number;
  public len: number;

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
        this.page = pokemons.filters.page;
        this.itemPerPage = pokemons.filters.itemPerPage;
        this.len = pokemons.len;
      }),
    );
    this.store.dispatch(loadPokemons());
  }

  public filterByPage($event: { page: number, pageSize: number, len: number }) {
    this.len = $event.len;
    this.page = $event.page;
    this.itemPerPage = $event.pageSize;
    this.store.dispatch(setPaginatorFilter({ page: this.page, itemPerPage: 10 }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
