import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

 @Input() pets: any;

  constructor() { }

  ngOnInit(): void {
  }

}
