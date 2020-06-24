import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './component/owner/owner.component';
import { PetComponent } from './component/pet/pet.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Owner', component: OwnerComponent },
  { path: '',   redirectTo: '/Home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'Pet', component: PetComponent },
  { path: 'Appointment', component: AppointmentComponent },  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
