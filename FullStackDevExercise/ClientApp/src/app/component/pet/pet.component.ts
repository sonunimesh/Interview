import { Component, OnInit } from '@angular/core';
import {PetService} from './services/pet.service';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { Pet} from './model/pet';
import {OwnerService} from '../owner/services/owner.service';
declare var $: any;
@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  petsList: any;
  petForm: FormGroup;
  actionTitle="Add Pet";
  owners: any;
  IsEdit  = false;
  newpet: Pet ={Id: '',
 Name:'',
Type:'',
Age: 0,
Owner_Id:0};
 constructor(private service: PetService,private fb: FormBuilder,private ownerservice: OwnerService) {
   this.createForm();
  }
  createForm()
  {
  this.petForm = this.fb.group({
     Name: ['', Validators.required],
     Type: ['', Validators.required],
     Age: ['', Validators.required],
     Owner_Id: ['', Validators.required],
     Id:['']

   });
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData()
  {
      this.service.getPets().subscribe(data=>
      {

        this.petsList=data;
        console.log(this.petsList);
      });
      this.ownerservice.getOwnders().subscribe(data=>
        {

          this.owners=data;
          console.log(this.owners);
        });


  }
  onSubmit()
  {
    this.newpet.Name= this.petForm.value.Name;
    this.newpet.Type= this.petForm.value.Type;
    this.newpet.Age= Number( this.petForm.value.Age);
    this.newpet.Owner_Id= Number(this.petForm.value.Owner_Id);
    if(this.IsEdit)
    {
      this.UpdatePet();

    }
    else{


    this.service.AddPet(this.newpet).subscribe(data=>
     { $('#addModal').modal('hide');
      this.loadData();
    });
    }
    this.loadData();
  }
  AddPet()
  {
    this.petForm.reset();
    this.actionTitle="Add Pet";
    $('#addModal').modal('show');

  }
  UpdatePet()
  {
    this.service.EditPet(this.petForm.value).subscribe(data=>
      {
        $('#addModal').modal('hide');
        console.log("data updated sucessfully");
      this.loadData();
    }
      );

  }
  DeletePet(deletepet: any)
  {
    this.service.DeletePet(deletepet.Id).subscribe(data=>
    { console.log("data successfully deleted");
      this.loadData();
     } )
  }
  EditPet( editPet : any)
  {

    this.actionTitle= 'Edit Owner ' + editPet.name;

    this.IsEdit= true;
    console.log(editPet);

    this.petForm.patchValue({
      Name: editPet.name,
      Type:editPet.type,
      Age: editPet.age,
      Owner_Id:editPet.Owner_id,
      Id:editPet.Id

    });

    $('#addModal').modal('show');

  }

}
