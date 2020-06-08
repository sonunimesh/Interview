import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* rxjs */
import { of, Observable, Subject } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

/* models */
import { OwnerModel } from './owner-model';

/* services */
import { ToastyService } from './../../shared/toasty.service';


@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  static GET_OWNERS = '/api/owner/getowners';
  static GET_OWNER = '/api/owner/getowner';
  static SAVE_OWNER = '/api/owner/save'

  constructor(private httpClient: HttpClient, private toastyService: ToastyService) { 
    this.ownerData$ = this.ownerData.asObservable();
    this.ownerDataStatus$ = this.ownerDataStatus.asObservable();
  }


/* actual data hold */
private ownerData: Subject<OwnerModel> = new Subject<OwnerModel>();
ownerData$: Observable<OwnerModel> = new Observable<OwnerModel>();

/* status of data read */
private ownerDataStatus: Subject<boolean> = new Subject<boolean>();
ownerDataStatus$: Observable<boolean> = new Observable<boolean>();

  public getOwners = () => {
    return this.httpClient.get<Array<OwnerModel>>(OwnersService.GET_OWNERS)
      .pipe(
        delay(1000),
        catchError(err => {
          this.toastyService.error('Problem getting data');
          return of(<Array<OwnerModel>>[]);
        })
      )
  }

  getOwner = (id: number) => {
    const ownerId = id || 0;
    const url = `${OwnersService.GET_OWNER}?id=${ownerId}`;
    this.ownerDataStatus.next(true);
    this.httpClient.get<OwnerModel>(url)
      .pipe(
        delay(1000),
        catchError(x => {
          this.toastyService.error("There was a problem getting the owner record")
          return of(<OwnerModel>{
           first_name: '',
           last_name: '',
           id: 0
          })
        })
      ).subscribe(
        (response: OwnerModel) => {
          this.ownerDataStatus.next(false)
          this.ownerData.next(response);
        }
      )
  }

  public save = (saveModel: OwnerModel) => {
    return this.httpClient.post<OwnerModel>(OwnersService.SAVE_OWNER, saveModel)
  }

}
