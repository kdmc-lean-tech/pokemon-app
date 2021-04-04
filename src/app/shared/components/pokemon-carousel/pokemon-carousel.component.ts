import { ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon, PokemonDetail } from '../../../models/pokemon.model';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-carousel',
  templateUrl: './pokemon-carousel.component.html',
  styleUrls: ['./pokemon-carousel.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PokemonCarouselComponent),
      multi: true
    }
  ]
})
export class PokemonCarouselComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() pokemonExclude: PokemonDetail;
  public pokemons: any[] = [];
  private subscriptions = new Subscription();
  onChange = (_: any) => {};
  onTouch = () => {}; 
  public form: FormGroup;
  private value: PokemonDetail;

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.subscriptions.add(
      this.pokemonControl.valueChanges
        .subscribe((value) => {
          this.onChange(value);
        })
    );
  }

  private createForm() {
    this.form = this.fb.group({
      pokemonControl: new FormControl(null)
    });
  }

  get pokemonControl() {
    return this.form.get('pokemonControl') as FormControl;
  }

  public searchPokemons($event = '') {
    this.pokemonService.searchPokemons($event)
      .subscribe(({ results }) => {
        this.populatePokemonsInfo(results);
      });
  }

  private populatePokemonsInfo(pokemons: Pokemon[]) {
    this.pokemons = [];
    setTimeout(() => {
      if (this.pokemonExclude) {
        this.pokemons = pokemons.filter(p => p._id !== this.pokemonExclude._id);
      } else {
        this.pokemons = pokemons;
      }
      if (this.value) {
        const pokmeonExits = this.pokemons.find(p => p._id === this.value._id);
        this.pokemonControl.setValue(pokmeonExits);
      }
      this.cdr.detectChanges();
    });
  }

  writeValue(value: PokemonDetail) {
    if (value && value !== null) {
      this.value = value;
      this.searchPokemons(value.name);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
