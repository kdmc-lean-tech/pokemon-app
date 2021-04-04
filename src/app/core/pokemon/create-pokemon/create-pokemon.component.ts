import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { StatisticsFormComponent } from './statistics-form/statistics-form.component';
import { UploadPokemonImageComponent } from './upload-pokemon-image/upload-pokemon-image.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonDetail, PokemonRequestBody } from '../../../models/pokemon.model';
import { ImageService } from '../../../services/image.service';
import { UploadsService } from '../../../services/uploads.service';
import { PokemonService } from '../../../services/pokemon.service';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SelectEvolutionPokemonFormComponent
} from './select-evolution-pokemon-form/select-evolution-pokemon-form.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.model';
import { loadPokemon, setPokemon } from '../../../store/actions/pokemons.actions';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.scss']
})
export class CreatePokemonComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pokemonForm') pokemonFormComponent: PokemonFormComponent;
  @ViewChild('statisticsForm') statisticsFormComponent: StatisticsFormComponent;
  @ViewChild('selectEvolutionForm') selectEvolutionFormComponent: SelectEvolutionPokemonFormComponent;
  @ViewChild('uploadPokemonForm') uploadPokemonForm: UploadPokemonImageComponent;
  public pokemonFormValid = false;
  public statisticsFormValid = false;
  public uploadFormValid = false;
  private subscriptions = new Subscription();
  public pokemon: PokemonDetail;
  public pokemonId: string;

  constructor(
    private imageService: ImageService,
    private uploadService: UploadsService,
    private pokemonService: PokemonService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.pokemonId = this.activatedRoute.snapshot.params.id;
    this.pokemonId && this.setPokemonInStore(this.pokemonId);
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      this.pokemonFormValid = this.pokemonFormComponent.form.valid;
      this.statisticsFormValid = this.statisticsFormComponent.form.valid;
      this.uploadFormValid = this.uploadPokemonForm.form.valid;
      this.listenForms();
    });
  }

  private setPokemonInStore(pokemonId: string) {
    this.store.dispatch(loadPokemon({ pokemonId }));
  }

  private listenForms() {
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
  }

  public uploadAvatarPokemonImage(file: File, pokemon: PokemonRequestBody) {
    if (file) {
      this.imageService.compressFile(file, 0.5)
        .then((result) => {
          const fileFormData: FormData = this.imageService.convertBlobToFormData(result, file.name);
          this.savePokemon(pokemon, fileFormData)
            .subscribe(() => {
              this.notificationService.showSuccess('Pokemon successfully created.');
              this.router.navigate(['/pokemon']);
            });
        });
    } else {
      this.savePokemon(pokemon)
        .subscribe(() => {
          this.notificationService.showSuccess('Pokemon successfully created.');
          this.router.navigate(['/pokemon']);
      });
    }
  }

  private savePokemon(pokemon: PokemonRequestBody, fileFormData?: FormData): Observable<any> {
    if (!this.pokemonId) {
      return this.pokemonService.savePokemon(pokemon)
        .pipe(
          switchMap(({ body }) => {
            return this.uploadService.uploadPokemonAvatar(fileFormData, body._id);
          })
        )
    } else {
      return this.pokemonService.editPokemon(this.pokemonId, pokemon)
        .pipe(
          switchMap(() => {
            return fileFormData ?
              this.uploadService.uploadPokemonAvatar(fileFormData, this.pokemonId) : of([]);
          })
        )
    }
  }

  public onSubmit() {
    const {
      name,
      isLegendary,
      generation,
      weight,
      pokedexNumber,
      height,
      types,
      abilities,
      categories
    } = this.pokemonFormComponent.form.value;

    const {
      speed,
      attack,
      defense,
      hp,
      spAttack,
      spDefense,
    } = this.statisticsFormComponent.form.value;

    const {
      description,
      file
    } = this.uploadPokemonForm.form.value;

    const {
      prevEvolution,
      nextEvolution
    } = this.selectEvolutionFormComponent.form.value;
    
    const body: PokemonRequestBody = {
      name,
      isLegendary,
      generation,
      weight,
      types,
      pokedexNumber,
      height,
      abilities,
      description,
      categories,
      pokemonStatistics: {
        attack,
        defense,
        hp,
        spAttack,
        spDefense,
        speed
      },
      prevEvolution: prevEvolution?._id,
      nextEvolution: nextEvolution?._id
    };
    this.uploadAvatarPokemonImage(file, body);
  }

  ngOnDestroy() {
    this.setPokemonInStore(null);
    this.subscriptions.unsubscribe();
  }
}
