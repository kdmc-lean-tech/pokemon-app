import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatisticsFormComponent } from './statistics-form/statistics-form.component';
import { UploadPokemonImageComponent } from './upload-pokemon-image/upload-pokemon-image.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonRequestBody } from '../../../models/pokemon.model';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.scss']
})
export class CreatePokemonComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pokemonForm') pokemonFormComponent: PokemonFormComponent;
  @ViewChild('statisticsForm') statisticsFormComponent: StatisticsFormComponent;
  @ViewChild('uploadPokemonForm') uploadPokemonForm: UploadPokemonImageComponent;
  public pokemonFormValid = false;
  public statisticsFormValid = false;
  public uploadFormValid = false;
  private subscriptions = new Subscription();
  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      this.pokemonFormValid = this.pokemonFormComponent.form.valid;
      this.statisticsFormValid = this.statisticsFormComponent.form.valid;
      this.uploadFormValid = this.uploadPokemonForm.form.valid;
      this.subscriptions.add(
        this.pokemonFormComponent.form.valueChanges.subscribe(() => {
          this.pokemonFormValid = this.pokemonFormComponent.form.valid;
        })
      );
      this.subscriptions.add(
        this.statisticsFormComponent.form.valueChanges.subscribe(() => {
          this.statisticsFormValid = this.statisticsFormComponent.form.valid;
        })
      );
      this.subscriptions.add(
        this.uploadPokemonForm.form.valueChanges.subscribe(() => {
          this.uploadFormValid = this.uploadPokemonForm.form.valid;
        })
      );
    });
  }

  public onSubmit() {
    const body: PokemonRequestBody = null;
    // TODO: Pending send form............
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
