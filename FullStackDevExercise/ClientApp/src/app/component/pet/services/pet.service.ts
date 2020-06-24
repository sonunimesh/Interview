import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pet} from '../model/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

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
  getPets() {
    return this.http.get(this.baseUrl + 'api/Pets');
  }
  AddPet(newData : Pet)
  {
    const headers = new HttpHeaders().set('content-type', 'application/json');
console.log(newData);
   return this.http.post<Pet>(this.baseUrl + 'api/Pets',{Id:0, Name:newData.Name,Type:newData.Type,Age:newData.Age,Owner_Id:newData.Owner_Id },{headers} );


  }
    EditPet(newData : Pet)
    {
      console.log(newData);
      const headers = new HttpHeaders().set('content-type', 'application/json');
      const params = new HttpParams().set('ID', newData.Id);
     return this.http.put<Pet>(this.baseUrl + 'api/Pets/'+ newData.Id,{Id:newData.Id, Name:newData.Name,Type:newData.Type,Age:newData.Age,Owner_Id:Number(newData.Owner_Id) },{headers,params} )


    }
    DeletePet(Id : any)
  {
    console.log(Id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('ID', Id);
   return this.http.delete<Pet>(this.baseUrl + 'api/Pets/'+ Id );


  }
}
