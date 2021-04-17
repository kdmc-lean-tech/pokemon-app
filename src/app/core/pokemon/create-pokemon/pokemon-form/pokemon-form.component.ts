import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../../../services/pokemon.service';
import {
  PokemonAbility,
  PokemonCategory,
  PokemonDetail,
  PokemonTypes
} from '../../../../models/pokemon.model';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/models/app.model';
import { maxNumber } from 'src/app/shared/validators/form-validators.utils';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit, OnDestroy {
  public pokemonAbilities: PokemonAbility[];
  public pokemonTypes: PokemonTypes[];
  public pokemonCategories: PokemonCategory[];
  public form: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getPokemon();
  }

  private getPokemon() {
    this.getPokemonAbilitiesAndTypes();
    this.subscriptions.add(
      this.store.select('pokemon').subscribe(({ pokemon }) => {
        pokemon && this.populateForm(pokemon);
      })
    );
  }

  private getPokemonAbilitiesAndTypes() {
    combineLatest(
      [
        this.pokemonService.getPokemonAbilities(),
        this.pokemonService.getPokemonTypes(),
        this.pokemonService.getPokemonCategories()
      ]
    ).subscribe(([pokemonAbilities, pokemonTypes, pokemonCategories]) => {
      this.pokemonAbilities = pokemonAbilities.results;
      this.pokemonTypes = pokemonTypes.results;
      this.pokemonCategories = pokemonCategories.results;
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      isLegendary: new FormControl(false, [Validators.required]),
      generation: new FormControl(null, [Validators.required, maxNumber(7)]),
      weight: new FormControl(null, [Validators.required]),
      pokedexNumber: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      types: new FormControl(null, [Validators.required]),
      abilities: new FormControl(null, [Validators.required]),
      categories: new FormControl(null, [Validators.required])
    });
  }

  private populateForm(pokemon: PokemonDetail) {
    this.form.patchValue({
      name: pokemon.name,
      isLegendary: pokemon.isLegendary,
      generation: pokemon.generation,
      weight: pokemon.weight,
      pokedexNumber: pokemon.pokedexNumber,
      height: pokemon.height,
      types: pokemon.types.map(({ _id }) => _id),
      abilities: pokemon.abilities.map(({ _id }) => _id),
      categories: pokemon.categories.map(({ _id }) => _id)
    });
  }

  get types() {
    return this.form.get('types') as FormControl;
  }

  get abilities() {
    return this.form.get('abilities') as FormControl;
  }

  get categories() {
    return this.form.get('categories') as FormControl;
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get isLegendary() {
    return this.form.get('isLegendary') as FormControl;
  }

  get generation() {
    return this.form.get('generation') as FormControl;
  }

  get weight() {
    return this.form.get('weight') as FormControl;
  }

  get pokedexNumber() {
    return this.form.get('pokedexNumber') as FormControl;
  }

  get height() {
    return this.form.get('height') as FormControl;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
