import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


// Datepicker
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thLocale } from 'ngx-bootstrap/locale';
import { ToastrModule } from 'ngx-toastr';

defineLocale('th', thLocale);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    ToastrModule.forRoot(),
    
  ],
  exports: [
    TooltipModule,
    ModalModule,
    BsDropdownModule,
    ButtonsModule,
  ]
})
export class Bootstrap5Module { }
