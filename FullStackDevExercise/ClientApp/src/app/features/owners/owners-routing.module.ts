import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { OwnersComponent } from './owners.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';


const routes: Routes = [
  {
    path: '',
    component: OwnersComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: OwnerEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:id',
    component: OwnerEditComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule {
  /* little dan wahlin trick */
  static components = [OwnersComponent, OwnerListComponent, OwnerEditComponent]
}
