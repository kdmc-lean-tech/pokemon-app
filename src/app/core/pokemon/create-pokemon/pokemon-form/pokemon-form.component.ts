import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../services/pokemon.service';
import { PokemonAbility, PokemonTypes } from '../../../../models/pokemon.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  public pokemonAbilities: PokemonAbility[];
  public pokemonTypes: PokemonTypes[];
  public form: FormGroup;

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPokemonAbilitiesAndTypes();
  }

  private getPokemonAbilitiesAndTypes() {
    combineLatest(
      [
        this.pokemonService.getPokemonAbilities(),
        this.pokemonService.getPokemonTypes()
      ]
    ).subscribe(([pokemonAbilities, pokemonTypes]) => {
      this.pokemonAbilities = pokemonAbilities.results;
      this.pokemonTypes = pokemonTypes.results;
      this.createForm();
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      isLegendary: new FormControl(false, [Validators.required]),
      generation: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      types: new FormArray([]),
      pokedexNumber: new FormControl(null, [Validators.required]),
      japaneseName: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      abilities: new FormArray([])
    });
    this.form.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  get types() {
    return this.form.get('types') as FormArray;
  }

  get abilities() {
    return this.form.get('abilities') as FormArray;
  }
}
