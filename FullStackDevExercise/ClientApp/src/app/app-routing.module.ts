import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'pets', loadChildren: () => import('./features/pets/pets.module').then(m => m.PetsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [MenuComponent, AppComponent];
}
