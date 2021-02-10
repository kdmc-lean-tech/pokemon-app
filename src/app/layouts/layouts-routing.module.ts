import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../core/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      },
      {
        path: 'pokemon',
        loadChildren: () => import('../core/pokemon/pokemon.module')
          .then(m => m.PokemonModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../core/chat/chat.module')
          .then(m => m.ChatModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
