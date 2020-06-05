import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* primeng modules we will be using */
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset'
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule} from 'primeng/message';
/* end primeng modules */

/* shared project components */
import { ProgressComponent } from './progress/progress.component';
import { DataViewModule } from 'primeng/dataview';

/* shared services */
import { ToastyService } from './toasty.service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [ProgressComponent],
  imports: [
    CommonModule,
    PanelModule,
    FieldsetModule,
    CardModule,
    ProgressSpinnerModule,
    DataViewModule,
    MessageModule
  ],
  exports: [
    PanelModule,
    FieldsetModule,
    CardModule,
    ProgressSpinnerModule,
    ProgressComponent,
    DataViewModule,
    MessageModule
  ],
  providers: [MessageService,ToastyService]
})
export class SharedModule { }
