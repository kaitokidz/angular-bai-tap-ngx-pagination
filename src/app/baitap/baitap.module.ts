import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaitapComponent } from './baitap.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [BaitapComponent],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [
    BaitapComponent
  ]
})
export class BaitapModule { }
