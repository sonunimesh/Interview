import { AppointmentService } from './services/appointment.service';
import { Component, OnInit } from '@angular/core';

import {PetService} from '../pet/services/pet.service';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { Appointment} from './model/appointment';


declare var $: any;
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointmentsList: any;
  appoinementForm: FormGroup;
  pets: any;
  actionTitle="Add Appointment";
  IsEdit  = false;
  newAppoinement: Appointment ={Id: '',
 Date:'',
Time:'',

pet_Id:0};
constructor(private service: AppointmentService,private fb: FormBuilder,private petservice: PetService) {
  this.createForm();
 }
 createForm()
 {
 this.appoinementForm = this.fb.group({
    Date: ['', Validators.required],
    Time: ['', Validators.required],

    pet_Id: ['', Validators.required],
    Id:['']

  });
 }

  ngOnInit(): void {
    this.loadData();
  }
  loadData()
  {
      this.service.getAppointment().subscribe(data=>
      {

        this.appointmentsList=data;
        console.log(this.appointmentsList);
      });
      this.petservice.getPets().subscribe(data=>
        {

          this.pets=data;
          console.log(this.pets);
        });


  }
  onSubmit()
  {console.log("submit");

   if(this.IsEdit)
    {
      this.newAppoinement.Date= this.appoinementForm.value.Date;
      this.newAppoinement.Time= this.appoinementForm.value.Time;
      this.newAppoinement.Id = this.appoinementForm.value.Id;
      this.newAppoinement.pet_Id= Number(this.appoinementForm.value.pet_Id);
      this.UpdateAppointment();

    }
    else{

      console.log(this.appoinementForm.value);
      this.newAppoinement.Date= this.appoinementForm.value.Date;
      this.newAppoinement.Time= this.appoinementForm.value.Time;

      this.newAppoinement.pet_Id= Number(this.appoinementForm.value.pet_Id);
    this.service.AddAppointment(this.newAppoinement).subscribe(data=>
     { $('#addModal').modal('hide');
       this.loadData();
    });
    }

  }
  AddAppointment()
  {
    this.appoinementForm.reset();
    this.actionTitle="Add Appointment";
    $('#addModal').modal('show');

  }
  UpdateAppointment()
  {
    this.service.EditAppointment(this.appoinementForm.value).subscribe(data=>
      {
        $('#addModal').modal('hide');
        console.log("data updated sucessfully");
        this.loadData();
    }
      );

  }
  DeleteAppointment(deleteappoinement: any)
  {
    this.service.DeleteAppointment(deleteappoinement.Id).subscribe(data=>
    { console.log("data successfully deleted");
      this.loadData();
     } )
  }
  EditAppointment( editAppointment : any)
  {
    this.actionTitle= 'Edit Appointment '+ editAppointment.name;

    this.IsEdit= true;
    console.log(editAppointment);

    this.appoinementForm.patchValue({
      Date: editAppointment.date,
      Time:editAppointment.time,

      pet_Id:editAppointment.pet_Id,
      Id:editAppointment.Id

    });

    $('#addModal').modal('show');

  }

}
