import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* module routing */
import { PetsRoutingModule } from './pets-routing.module';

/* custom shared module */
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: PetsRoutingModule.components,
  imports: [
    CommonModule,
    PetsRoutingModule,
    SharedModule
  ]
})
export class PetsModule { }
