import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { PetListComponent } from './pet-list/pet-list.component';
import { PetsComponent} from './pets.component';

const routes: Routes = [
  {
    path: '',
    component: PetsComponent,
    pathMatch: 'full'
  },
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  bootstrap:[PetsComponent]
})
export class PetsRoutingModule {
  static components = [PetsComponent,PetListComponent]
}
