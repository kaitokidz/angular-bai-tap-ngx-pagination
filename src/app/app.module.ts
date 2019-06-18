import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BaitapModule } from './baitap/baitap.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BaitapModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
