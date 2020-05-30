import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/* app modules */
import { SharedModule } from './shared/shared.module';

/* primeng menu */
import { MenuModule } from 'primeng/menu';


/* application components */
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppRoutingModule.components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
