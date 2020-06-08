import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/* rxjs */
import { Observable } from 'rxjs';

/* models */
import { PetRetreivalModel } from './../pet-retreival-model';

/* services */
import { PetsService } from './../pets.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  petsData$: Observable<Array<PetRetreivalModel>>;


  constructor(private petsService: PetsService,private router: Router) {
    this.petsData$ = this.petsService.getPets();
   }

  ngOnInit(): void {
  }

  editPet = (id: number) => {
    this.router.navigate(['/pets/edit',id]);
  }

  newPet = () => {
    this.router.navigate(['/pets/edit']);
  }

}
