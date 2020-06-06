import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


/* rxjs */
import { Observable } from 'rxjs';

/* services */
import { PetsService } from './../pets.service';

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
export class PetEditComponent implements OnInit {
  petForm: FormGroup;
  petSaveItem: PetSaveModel;
  petEditResponse: PetEditResponseModel;
  Owners: Array<SelectItem> = [];
  loading = false;

  petData$: Observable<PetEditResponseModel>
  petDataStatus$: Observable<boolean>;

  constructor(private petsService: PetsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.petForm = this.formBuilder.group({
      name: ['', Validators.required],
      owner: [null, Validators.required],
      type: ['', Validators.required],
      age: [null, Validators.required]
    })

    this.petData$ = this.petsService.petData$;
    this.petDataStatus$ = this.petsService.petDataStatus$;

  }

  ngOnInit(): void {
    this.subscribeToData();
    this.subscribeToTheDataStatus();
    this.petsService.getPet(1);
  }


  private subscribeToData = () => {
    this.petData$.subscribe(
      (response: PetEditResponseModel) => {
        this.petEditResponse = response;
        this.convertBackEndLookupItemstoPrimeNgSelectItems();
        console.log(this.Owners);
      }
    )
  }

  private subscribeToTheDataStatus = () => {
    this.petDataStatus$.subscribe(
      (status: boolean) => {
        this.loading = status;
      }
    )
  }

  private convertBackEndLookupItemstoPrimeNgSelectItems = () => {
    if(!this.petEditResponse) {
      return;
    }
   
    if(!this.petEditResponse.owners) {
      return;
    }
  
    this.Owners = this.petEditResponse.owners.map(
      (item: LookupItem) =>{
        return <SelectItem>{
          label: item.display,
          value: item.id
        }
      }
    )
  }


  private fillPetForm = () => {
    if(!this.petEditResponse) {
      return;
    }

    if(!this.petEditResponse.pet) {
      return;
    }

    

  }



}
