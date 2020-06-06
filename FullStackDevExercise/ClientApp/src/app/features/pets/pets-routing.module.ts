import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { PetListComponent } from './pet-list/pet-list.component';
import { PetsComponent } from './pets.component';
import { PetEditComponent } from './pet-edit/pet-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PetsComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: PetEditComponent,
    pathMatch: 'full'
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  bootstrap: [PetsComponent]
})
export class PetsRoutingModule {
  static components = [PetsComponent, PetListComponent,PetEditComponent]
}
