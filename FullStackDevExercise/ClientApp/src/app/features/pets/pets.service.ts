import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* rxjs */
import { of, Observable, Subject } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

/* services */
import { ToastyService } from '../../shared/toasty.service';


/* models */
import { PetRetreivalModel } from './pet-retreival-model';
import { PetEditResponseModel } from './pet-edit-response-model';
import { LookupItem } from './../../core/lookup-item';
import { PetEditModel } from './pet-edit-model';



@Injectable({
  providedIn: 'root'
})
export class PetsService {

  static GET_PETS_URL = '/api/pet/getpets';
  static GET_PET_RESPONSE = '/api/pet/getpet'

  constructor(private httpClient: HttpClient, private toastyService: ToastyService) {
    this.petData$ = this.petData.asObservable();
    this.petDataStatus$ = this.petDataStatus.asObservable();
  }

  /* actual data hold */
  private petData: Subject<PetEditResponseModel> = new Subject<PetEditResponseModel>();
  petData$: Observable<PetEditResponseModel> = new Observable<PetEditResponseModel>();

  /* status of data read */
  private petDataStatus: Subject<boolean> = new Subject<boolean>();
  petDataStatus$: Observable<boolean> = new Observable<boolean>();

  /* generally you don't put private/public together like this, it violates */
  /* the angular style guide, it's just kind of my personal preference */


  getPet = (id: number) => {
    const petId = id || ''
    const url = `${PetsService.GET_PET_RESPONSE}?id=${petId}`;
    this.petDataStatus.next(true);
    this.httpClient.get<PetEditResponseModel>(url)
      .pipe(
        delay(1000),
        catchError(x => {
          this.toastyService.error("There was a problem getting the pet record")
          return of(<PetEditResponseModel>{
            owners: <Array<LookupItem>>[],
            pet: <PetEditModel>{}
          })
        })
      ).subscribe(
        (response: PetEditResponseModel) => {
          this.petDataStatus.next(false)
          this.petData.next(response);
        }
      )
  }


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
