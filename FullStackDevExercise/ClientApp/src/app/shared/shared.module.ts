import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* primeng modules we will be using */
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset'
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
/* end primeng modules */

/* shared project components */
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [ProgressComponent],
  imports: [
    CommonModule,
    PanelModule,
    FieldsetModule,
    CardModule,
    ProgressSpinnerModule
  ],
  exports: [
    PanelModule,
    FieldsetModule,
    CardModule,
    ProgressSpinnerModule,
    ProgressComponent
  ]
})
export class SharedModule { }
