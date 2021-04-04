import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { ApprovePokemonComponent } from './approve-pokemon/approve-pokemon.component';


const routes: Routes = [
  {
    path: '',
    component: PokemonComponent,
    children: [
      {
        path: '',
        component: PokemonListComponent
      },
      {
        path: 'add-pokemon',
        component: CreatePokemonComponent
      },
      {
        path: 'add-pokemon/:id',
        component: CreatePokemonComponent
      },
      {
        path: 'approve-pokemon',
        component: ApprovePokemonComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
