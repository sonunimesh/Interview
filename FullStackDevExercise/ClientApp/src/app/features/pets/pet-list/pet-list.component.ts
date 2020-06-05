import { Component, OnInit, Input } from '@angular/core';

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


  constructor(private petsService: PetsService) {
    this.petsData$ = this.petsService.getPets();
   }

  ngOnInit(): void {
  }

}
