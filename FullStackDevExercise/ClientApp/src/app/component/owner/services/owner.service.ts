import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Owner} from '../model/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
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
  getOwnders() {
    return this.http.get(this.baseUrl + 'api/Owners');
  }
  AddOwner(newData : Owner)
  {
    const headers = new HttpHeaders().set('content-type', 'application/json');

  return  this.http.post<Owner>(this.baseUrl + 'api/Owners',{ First_Name:newData.First_Name,Last_Name:newData.Last_Name },{headers} );


  }
    EditOwner(newData : Owner)
  {
    console.log(newData);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('ID', newData.Id);
   return this.http.put<Owner>(this.baseUrl + 'api/Owners/'+ newData.Id,{Id:newData.Id, First_Name:newData.First_Name,Last_Name:newData.Last_Name },{headers,params} )


  }
  DeleteOwner(Id : any)
  {
    console.log(Id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const params = new HttpParams().set('ID', Id);
   return this.http.delete<Owner>(this.baseUrl + 'api/Owners/'+ Id );


  }

}
