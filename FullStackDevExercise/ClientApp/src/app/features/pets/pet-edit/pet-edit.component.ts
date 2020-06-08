import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


/* rxjs */
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

/* services */
import { PetsService } from './../pets.service';
import { ToastyService } from './../../../shared/toasty.service';

/* models */
import { LookupItem } from './../../../core/lookup-item';
import { SelectItem } from 'primeng/api';
import { PetSaveModel } from './../pet-save-model';
import { PetEditResponseModel } from '../pet-edit-response-model';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  petForm: FormGroup;
  petId:number = 0;
  petSaveItem: PetSaveModel;
  petEditResponse: PetEditResponseModel;
  Owners: Array<SelectItem> = [];
  loading = false;

  petData$: Observable<PetEditResponseModel>
  petDataStatus$: Observable<boolean>;

  constructor(private petsService: PetsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService) {
    this.petForm = this.formBuilder.group({
      name: ['', Validators.required],
      owner: ['', Validators.required],
      type: ['', Validators.required],
      age: ['', Validators.required]
    })

    this.petData$ = this.petsService.petData$;
    this.petDataStatus$ = this.petsService.petDataStatus$;

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
    this.subscribeToQueryParamPetId();
  }




  saveRecord = () => {
    this.petSaveItem = <PetSaveModel>{
       id: this.petId || 0
    }
    this.petSaveItem.age = Number(this.petForm.get('age').value);
    this.petSaveItem.owner_id = this.petForm.get('owner').value.value;
    this.petSaveItem.type = this.petForm.get('type').value;
    this.petSaveItem.name = this.petForm.get('name').value;
    this.petsService.savePet(this.petSaveItem)
      .subscribe(
        (success) => {
          this.toastyService.success('Pet Saved Successfully');
          this.router.navigate(['/pets']);
        },
        (error) => {
          this.toastyService.error('Error Saving Pet')
        }
      )
  }

  cancel = () => {
    this.router.navigate(['/pets'])
  }

  private subscribeToQueryParamPetId = () => {
    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(
      (id: number) => {
        this.petId = Number(id);
        this.petsService.getPet(id)
      }
    )
  }

  private subscribeToData = () => {
    this.subscriptions.push(
      this.petData$.subscribe(
        (response: PetEditResponseModel) => {
          this.petEditResponse = response;
          this.convertBackEndLookupItemstoPrimeNgSelectItems();
          this.fillPetForm();
        }
      ))
  }

  private subscribeToTheDataStatus = () => {
    this.subscriptions.push(
      this.petDataStatus$.subscribe(
        (status: boolean) => {
          this.loading = status;
        }
      ))
  }

  private convertBackEndLookupItemstoPrimeNgSelectItems = () => {
    if (!this.EnsureWeHaveAResponseWithOwners()) {
      return;
    }

    this.Owners = this.petEditResponse.owners.map(
      (item: LookupItem) => {
        return <SelectItem>{
          label: item.display,
          value: item.id
        }
      }
    )
  }


  private fillPetForm = () => {
    if (!this.EnsureWeHaveAResponseWithPet) {
      return;
    }
    this.petForm.get('name').setValue(this.petEditResponse.pet.name);
    this.petForm.get('owner').setValue(this.GetOwnerSelectItem(this.petEditResponse.pet.owner_id));
    this.petForm.get('type').setValue(this.petEditResponse.pet.type);
    this.petForm.get('age').setValue(this.petEditResponse.pet.age);
  }

  private GetOwnerSelectItem = (owner_id: number) => {
    if (!this.EnsureWeHaveAResponseWithOwners) {
      return;
    }

    const owner = this.Owners.find(x => x.value == owner_id);
    if (!owner) {
      return;
    }

    return owner;
  }


  private EnsureWeHaveAResponseWithPet = (): boolean => {
    if (!this.petEditResponse) {
      return false;
    }

    if (!this.petEditResponse.pet) {
      return false;
    }
    return true;
  }

  private EnsureWeHaveAResponseWithOwners = (): boolean => {
    if (!this.petEditResponse) {
      return false;
    }

    if (!this.petEditResponse.owners) {
      return false;
    }
    return true;
  }



}
