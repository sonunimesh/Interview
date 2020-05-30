import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* primeng modules we will be using */
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset'
import { CardModule } from 'primeng/card';
/* end primeng modules */


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    FieldsetModule,
    CardModule
  ],
  exports: [
    PanelModule,
    FieldsetModule,
    CardModule
  ]
})
export class SharedModule { }
