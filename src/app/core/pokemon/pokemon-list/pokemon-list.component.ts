import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.model';
import { Subscription, Observable } from 'rxjs';
import {
  loadPokemons,
  setPaginatorFilter,
  toggleSortFilter,
  toogleSortFilterBySelects,
  setSearchFilter
} from '../../../store/actions/pokemons.actions';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonFilter } from '../../../store/models/pokemons.model';
import { SortPokemonColumn } from '../../../models/filter.model';
import { BreakpointObserverService } from '../../../services/breakpoint-observer.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  public pokemons: Pokemon[];
  private subscriptions = new Subscription();
  public columns: string[] = ['photo', 'pokedex', 'name', 'generation', 'created', 'date'];
  public dataSource: MatTableDataSource<Pokemon>;
  public page: number;
  public itemPerPage: number;
  public len: number;
  public count: number;
  public filters: PokemonFilter;
  public size$: Observable<string>;
  public sortByOptions: { label: string, value: string }[] = [
    { label: 'Name', value: 'name' },
    { label: 'Pokedex Number', value: 'pokedexNumber' },
    { label: 'CreatedBy', value: 'createdBy.name' },
    { label: 'Generation', value: 'generation' },
    { label: 'Created At', value: 'createdAt' }
  ];
  public sortByType: string[] = ['Ascending', 'Descending'];
  public sortForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private breakpointObserverService: BreakpointObserverService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.size$ = this.breakpointObserverService.size$;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.getPokemons();
    this.createForm();
  }

  public createForm() {
    this.sortForm = this.fb.group({
      columnName: new FormControl('createdAt'),
      sortType: new FormControl('Ascending')
    });
    this.listenSortControl();
  }

  public getPokemons() {
    this.subscriptions.add(
      this.store.subscribe(({ pokemons }) => {
        this.pokemons = pokemons.pokemons;
        this.dataSource.data = this.pokemons;
        this.page = pokemons.filters.page;
        this.itemPerPage = pokemons.filters.itemPerPage;
        this.len = pokemons.len;
        this.filters = pokemons.filters;
      }),
    );
    this.store.dispatch(loadPokemons());
  }

  public filterByPage($event: { page: number, pageSize: number, len: number }) {
    this.len = $event.len;
    this.page = $event.page;
    this.itemPerPage = $event.pageSize;
    this.store.dispatch(setPaginatorFilter({ page: this.page, itemPerPage: this.itemPerPage }));
  }

  public toogleSortByColumn(columnName: SortPokemonColumn) {
    this.store.dispatch(toggleSortFilter({ columnName }));
  }

  public searchPokemons($event: string) {
    this.store.dispatch(setSearchFilter({ search: $event }));
  }

  public listenSortControl() {
    this.subscriptions.add(
      this.sortForm.valueChanges.subscribe(value => {
        const { columnName, sortType } = value;
        const sortTypeFormat = sortType === 'Ascending' ? 1 : -1;
        this.store.dispatch(toogleSortFilterBySelects({ columnName, sortType: sortTypeFormat }));
      })
    );
  }

  public goToCreatePokemon() {
    this.router.navigate(['pokemon/add-pokemon']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
