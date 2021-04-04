import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PokemonDetail } from '../../../../models/pokemon.model';
import { AppState } from '../../../../store/models/app.model';

@Component({
  selector: 'app-statistics-form',
  templateUrl: './statistics-form.component.html',
  styleUrls: ['./statistics-form.component.scss']
})
export class StatisticsFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getPokemon();
  }

  private getPokemon() {
    this.subscriptions.add(
      this.store.select('pokemon').subscribe(({ pokemon }) => {
        pokemon && this.populateForm(pokemon);
      })
    );
  }

  private createForm() {
    this.form = this.fb.group({
      speed: new FormControl(null, [Validators.required]),
      attack: new FormControl(null, [Validators.required]),
      defense: new FormControl(null, [Validators.required]),
      hp: new FormControl(null, [Validators.required]),
      spAttack: new FormControl(null, [Validators.required]),
      spDefense: new FormControl(null, [Validators.required])
    });
  }

  private populateForm(pokemon: PokemonDetail) {
    const { pokemonStatistics } = pokemon;
    this.form.patchValue({
      speed: pokemonStatistics.speed,
      attack: pokemonStatistics.attack,
      defense: pokemonStatistics.defense,
      hp: pokemonStatistics.hp,
      spAttack: pokemonStatistics.spAttack,
      spDefense: pokemonStatistics.spDefense
    });
  }

  get speed() {
    return this.form.get('speed') as FormControl;
  }

  get attack() {
    return this.form.get('attack') as FormControl;
  }

  get defense() {
    return this.form.get('defense') as FormControl;
  }

  get hp() {
    return this.form.get('hp') as FormControl;
  }

  get spAttack() {
    return this.form.get('spAttack') as FormControl;
  }

  get spDefense() {
    return this.form.get('spDefense') as FormControl;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
