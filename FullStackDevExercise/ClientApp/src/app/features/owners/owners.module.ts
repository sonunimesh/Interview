import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module'

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { OwnersComponent } from './owners.component';


@NgModule({
  declarations: OwnersRoutingModule.components,
  imports: [
    CommonModule,
    OwnersRoutingModule,
    SharedModule
  ]
})
export class OwnersModule { }
