import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* rxjs */
import { of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

/* services */
import { ToastyService } from '../../shared/toasty.service';


/* models */
import { PetRetreivalModel } from './pet-retreival-model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  static GET_PETS_URL = '/api/pet/getpets';

  constructor(private httpClient: HttpClient,private toastyService: ToastyService) { }


  getPets = () => {
    return this.httpClient.get<Array<PetRetreivalModel>>(PetsService.GET_PETS_URL)
    .pipe(
      delay(1000),
      catchError(err => {
          this.toastyService.error('Problem getting data');
          return of(<Array<PetRetreivalModel>>[]);
      })
    )  
  }





  



}
