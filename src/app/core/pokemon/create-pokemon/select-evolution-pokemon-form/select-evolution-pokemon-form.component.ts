import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../store/models/app.model';
import { PokemonDetail } from '../../../../models/pokemon.model';
import { first, skip, tap } from 'rxjs/operators';
import { PokemonCarouselComponent } from 'src/app/shared/components/pokemon-carousel/pokemon-carousel.component';
import { PokemonDetailState } from 'src/app/store/models/pokemons.model';

@Component({
  selector: 'app-select-evolution-pokemon-form',
  templateUrl: './select-evolution-pokemon-form.component.html',
  styleUrls: ['./select-evolution-pokemon-form.component.scss']
})
export class SelectEvolutionPokemonFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pokemonCarouselNext') pokemonCarouselNext: PokemonCarouselComponent;
  @ViewChild('pokemonCarouselPrev') pokemonCarouselPrev: PokemonCarouselComponent;
  public form: FormGroup;
  private subscriptions = new Subscription();
  public pokemon: PokemonDetail;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.getPokemon();
  }

  private getPokemon() {
    this.subscriptions.add(
      this.store.select('pokemon')
        .pipe(
          tap((pokemonState) => this.getEmitionsOfPokemonStore(pokemonState)),
          skip(1),
          first()
        )
        .subscribe(({ pokemon }) => {
          this.pokemon = pokemon;
          this.populateForm(this.pokemon);
        })
    );
  }

  private createForm() {
    this.form = this.fb.group({
      prevEvolution: new FormControl(null),
      nextEvolution: new FormControl(null)
    });
  }

  private populateForm(pokemon: PokemonDetail) {
    if (pokemon.prevEvolution) {
      this.form.get('prevEvolution')
        .setValue(this.transformPokemonObject(pokemon.prevEvolution));
    } else {
      this.pokemonCarouselPrev.searchPokemons();
    }
    if (pokemon.nextEvolution) {
      this.form.get('nextEvolution')
        .setValue(this.transformPokemonObject(pokemon.nextEvolution));
    } else {
      this.pokemonCarouselNext.searchPokemons();
    }
  }

  private transformPokemonObject(pokemon: PokemonDetail) {
    return {
      _id: pokemon._id,
      name: pokemon.name,
      pokedexNumber: pokemon.pokedexNumber,
      status: pokemon.status,
      avatar: pokemon.avatar
    }
  }

  public returnChanges(mode: 'prev' | 'next') {
    const { nextEvolution, prevEvolution } = this.pokemon;
    mode === 'next' ?
      this.form.get('nextEvolution').setValue(this.transformPokemonObject(nextEvolution)) :
        this.form.get('prevEvolution').setValue(this.transformPokemonObject(prevEvolution));
  }

  public clearSearch(mode: 'prev' | 'next') {
    if (mode === 'next') {
      this.pokemonCarouselNext.searchPokemons();
    } else {
      this.pokemonCarouselPrev.searchPokemons();
    }
  }

  private getEmitionsOfPokemonStore(pokemonState: PokemonDetailState) {
    if (pokemonState && !pokemonState.pokemonId) {
      this.pokemonCarouselNext.searchPokemons();
      this.pokemonCarouselPrev.searchPokemons();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
