import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerComponent } from './component/owner/owner.component';
import { PetComponent } from './component/pet/pet.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const  baseURL="http://localhost:5001/";
@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    PetComponent,
    AppointmentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: 'BASE_URL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
