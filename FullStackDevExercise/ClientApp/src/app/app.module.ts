import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/* app modules */
import { SharedModule } from './shared/shared.module';

/* primeng modules */
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

/* application components */
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppRoutingModule.components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MenuModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
