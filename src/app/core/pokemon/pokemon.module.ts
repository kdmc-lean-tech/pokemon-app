import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { SharedModule } from '../../shared/shared.module';
import { PokemonFormComponent } from './create-pokemon/pokemon-form/pokemon-form.component';
import { StatisticsFormComponent } from './create-pokemon/statistics-form/statistics-form.component';
import { UploadPokemonImageComponent } from './create-pokemon/upload-pokemon-image/upload-pokemon-image.component';


@NgModule({
  declarations: [
    PokemonComponent,
    PokemonListComponent,
    CreatePokemonComponent,
    PokemonFormComponent,
    StatisticsFormComponent,
    UploadPokemonImageComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule
  ]
})
export class PokemonModule { }
