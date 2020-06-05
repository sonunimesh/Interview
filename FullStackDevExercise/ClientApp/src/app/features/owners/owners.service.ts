import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*rxjs*/
import { of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';


/* models */
import { OwnerModel } from './owner-model';

/* services */
import { ToastyService } from './../../shared/toasty.service';


@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  static GET_OWNERS = '/api/owner/getowners';
  static SAVE_OWNER = '/api/owner/save'

  constructor(private httpClient: HttpClient, private toastyService: ToastyService) { }


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


  public save = (saveModel: OwnerModel) => {
    return this.httpClient.post<OwnerModel>(OwnersService.SAVE_OWNER, saveModel)
  }

}
