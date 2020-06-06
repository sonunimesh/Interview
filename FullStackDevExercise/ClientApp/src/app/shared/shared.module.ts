import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/* primeng modules we will be using */
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset'
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
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
    ReactiveFormsModule,
    PanelModule,
    FieldsetModule,
    CardModule,
    ProgressSpinnerModule,
    DataViewModule,
    MessageModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    TooltipModule,
    DropdownModule
  ],
  exports: [
    ReactiveFormsModule,
    PanelModule,
    FieldsetModule,
    CardModule,
    ProgressSpinnerModule,
    ProgressComponent,
    DataViewModule,
    MessageModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    TooltipModule,
    DropdownModule
  ],
  providers: [MessageService, ToastyService]
})
export class SharedModule { }
