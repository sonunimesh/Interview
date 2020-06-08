import { Component, OnInit } from '@angular/core';
import { Observable }  from 'rxjs';
import { Router } from '@angular/router';


/* custom service */
import { OwnersService } from './../owners.service';
import { OwnerModel } from './../owner-model';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  ownerData$: Observable<Array<OwnerModel>>;
  constructor(private ownerService: OwnersService,private router: Router) {
    this.ownerData$ = this.ownerService.getOwners();
   }

  ngOnInit(): void {
  }

  editOwner = (id: number) => {
    this.router.navigate(['/owners/edit',id]);
  }

  newOwner = () => {
    this.router.navigate(['/owners/edit']);
  }

}
