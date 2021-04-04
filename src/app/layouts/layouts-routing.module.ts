import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbilitiesComponent } from '../admin/abilities/abilities.component';
import { CategoriesComponent } from '../admin/categories/categories.component';
import { TypesComponent } from '../admin/types/types.component';
import { UsersComponent } from '../admin/users/users.component';
import { RolesComponent } from '../admin/roles/roles.component';
import { LayoutsComponent } from './layouts.component';
import { RoleGuard } from '../guards/role.guard';

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
          .then(m => m.DashboardModule),
        canActivate: [RoleGuard]
      },
      {
        path: 'pokemon',
        loadChildren: () => import('../core/pokemon/pokemon.module')
          .then(m => m.PokemonModule),
        canActivate: [RoleGuard]
      },
      {
        path: 'chat',
        loadChildren: () => import('../core/chat/chat.module')
          .then(m => m.ChatModule),
        canActivate: [RoleGuard]
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'abilities',
        component: AbilitiesComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'types',
        component: TypesComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [RoleGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
