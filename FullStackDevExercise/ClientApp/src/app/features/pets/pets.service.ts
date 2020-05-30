import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* rxjs */
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  static GET_PETS_URL = '/api/pets/getpets';

  constructor(private httpClient: HttpClient) { }

  /* not necessary in line with style guide */
  /* i like putting my subject/observables data/status together */
  PetsData$: Observable<any> = new Observable<any>();
  private PetsData: Subject<any> = new Subject<any>();


  PetsDataStatus$: Observable<boolean> = new Observable<boolean>();
  private PetsDataStatus: Subject<boolean> = new Subject<boolean>();


  getPets = () => {
    this.httpClient.get(PetsService.GET_PETS_URL)
    .pipe(

    )
  }





  



}
