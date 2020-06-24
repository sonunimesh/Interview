import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Appointment} from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  constructor(

    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  getAppointment() {
    return this.http.get(this.baseUrl + 'api/Appointment');
  }
  AddAppointment(newData : Appointment)
  {
    const headers = new HttpHeaders().set('content-type', 'application/json');
console.log(newData);
   return this.http.post<Appointment>(this.baseUrl + 'api/Appointment',{Id:0, Date:newData.Date,Time:newData.Time,pet_Id:newData.pet_Id },{headers} );


  }
  EditAppointment(newData : Appointment)
  {
    console.log(newData);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('ID', newData.Id);
   return this.http.put<Appointment>(this.baseUrl + 'api/Appointment/'+ newData.Id,{Id:newData.Id, Date:newData.Date,Time:newData.Time,pet_Id:Number(newData.pet_Id) },{headers,params} )


  }
  DeleteAppointment(Id : any)
  {
    console.log(Id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('ID', Id);
   return this.http.delete<Appointment>(this.baseUrl + 'api/Appointment/'+ Id );


  }

}
