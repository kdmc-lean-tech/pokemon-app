import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RoleGuard } from '../../guards/role.guard';


const routes: Routes = [
  {
    path: '',
    component: PokemonComponent,
    canActivate: [RoleGuard],
    data: {
      roles: ['admin', 'user']
    },
    children: [
      {
        path: '',
        component: PokemonListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
