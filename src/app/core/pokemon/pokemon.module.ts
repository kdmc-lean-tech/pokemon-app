import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [PokemonComponent, PokemonListComponent, CreatePokemonComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule
  ]
})
export class PokemonModule { }
