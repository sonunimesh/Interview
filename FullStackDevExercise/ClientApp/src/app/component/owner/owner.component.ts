import { Component, OnInit } from '@angular/core';
import {OwnerService} from './services/owner.service';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { Owner} from './model/owner';
declare var $: any;
@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
   ownersList: any;
   ownerForm: FormGroup;
   IsEdit  = false;
   actionTitle="Add Owner";
   newOwner: Owner ={Id: '',
  First_Name:'',
Last_Name:''};
  constructor(private service: OwnerService,private fb: FormBuilder) {
    this.createForm();
   }

   createForm()
   {
   this.ownerForm = this.fb.group({
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
      Id:['']

    });
   }
  ngOnInit(): void {
    this.loadData();
  }
  loadData()
  {
      this.service.getOwnders().subscribe(data=>
      {

        this.ownersList=data;
        console.log(this.ownersList);
      });

  }
  onSubmit()
  {
    if(this.IsEdit)
    {
      this.UpdateOwner();

    }
    else{
    this.newOwner.First_Name= this.ownerForm.value.First_Name;
    this.newOwner.Last_Name= this.ownerForm.value.Last_Name;

    this.service.AddOwner(this.newOwner).subscribe(data=>
      {
        this.loadData();
        $('#addModal').modal('hide');
      });
    }

  }
  AddOwner()
  {
    this.ownerForm.reset();
    this.actionTitle="Add Owner";
    $('#addModal').modal('show');

  }
  UpdateOwner()
  {
    this.service.EditOwner(this.ownerForm.value).subscribe(data=>
    {
        this.loadData()
        $('#addModal').modal('hide');
    });

  }
  DeleteOwner(deleteowner: any)
  {
    this.service.DeleteOwner(deleteowner.id).subscribe(data=>
    {
        this.loadData()
        $('#addModal').modal('hide');
    }
      )
  }
  EditOwner( editOwner : any)
  {

    this.IsEdit= true;
    this.actionTitle= 'Edit Owner ' + editOwner.first_Name +" " + editOwner.last_Name;
    console.log(editOwner);

    this.ownerForm.patchValue({
      First_Name: editOwner.first_Name,
      Last_Name:editOwner.last_Name,
      Id:editOwner.id

    });

    $('#addModal').modal('show');

  }

}
