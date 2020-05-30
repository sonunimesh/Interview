import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetsComponent } from './pets.component';


@NgModule({
  declarations: [PetListComponent, PetsComponent],
  imports: [
    CommonModule,
    PetsRoutingModule
  ]
})
export class PetsModule { }
