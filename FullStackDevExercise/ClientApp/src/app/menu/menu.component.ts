import { Component, OnInit } from '@angular/core';

/* primeng menu item */
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: Array<MenuItem>;
  constructor() { }

  ngOnInit(): void {
    this.loadMenu();
  }



  private loadMenu = () => {
    this.menuItems = <Array<MenuItem>>[
      <MenuItem>{
        label: 'Pets',
        routerLink: '/pets',
        icon: 'fas fa-paw'
        
      },
      <MenuItem>{
        label: 'Owners',
        routerLink: '/owners',
        icon: 'fas fa-user-friends'
      }
    ]
  }

}
