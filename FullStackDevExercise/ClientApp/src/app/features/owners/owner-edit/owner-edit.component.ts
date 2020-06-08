import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/* rxjs */
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

/* services */
import { OwnersService } from './../owners.service';
import { ToastyService } from './../../../shared/toasty.service';

/* models */
import { OwnerModel } from './../owner-model';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  ownerForm: FormGroup;
  loading = false;


  subscriptions: Array<Subscription> = [];

  ownerId: number = 0;
  ownerSaveItem: OwnerModel;


  ownerData$: Observable<OwnerModel>
  ownerDataStatus$: Observable<boolean>;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ownersService: OwnersService,
    private toastyService: ToastyService) {
    this.ownerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    })

    this.ownerData$ = this.ownersService.ownerData$;
    this.ownerDataStatus$ = this.ownersService.ownerDataStatus$;

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

  ngOnInit(): void {
    this.subscribeToData();
    this.subscribeToTheDataStatus();
    this.subscribeToQueryParamOwnerId();
  }



  saveRecord = () => {
    this.ownerSaveItem = <OwnerModel>{
      id: this.ownerId || 0
    }
    this.ownerSaveItem.first_name = this.ownerForm.get('first_name').value;
    this.ownerSaveItem.last_name = this.ownerForm.get('last_name').value;
    this.ownersService.save(this.ownerSaveItem)
      .subscribe(
        (success) => {
          this.toastyService.success('owner Saved Successfully');
          this.router.navigate(['/owners']);
        },
        (error) => {
          this.toastyService.error('Error Saving owner')
        }
      )
  }


  private subscribeToQueryParamOwnerId = () => {
    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(
      (id: number) => {
        this.ownerId = Number(id);
        this.ownersService.getOwner(id)
      }
    )
  }

  private subscribeToData = () => {
    this.subscriptions.push(
      this.ownerData$.subscribe(
        (response: OwnerModel) => {
          this.ownerSaveItem = response;
          this.ownerForm.get('first_name').setValue(this.ownerSaveItem.first_name);
          this.ownerForm.get('last_name').setValue(this.ownerSaveItem.last_name);
        }
      ))
  }

  private subscribeToTheDataStatus = () => {
    this.subscriptions.push(
      this.ownerDataStatus$.subscribe(
        (status: boolean) => {
          this.loading = status;
        }
      ))
  }


  cancel = () => {
    this.router.navigate(['/owners'])
  }

}
