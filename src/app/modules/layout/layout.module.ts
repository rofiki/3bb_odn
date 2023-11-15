import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderIsLoginComponent } from './islogin/header/header.component';
import { FooterIsLoginComponent } from './islogin/footer/footer.component';

import { HeaderGeneralComponent } from './general/header/header.component';
import { FooterGeneralComponent } from './general/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HeaderIsLoginComponent,
    FooterIsLoginComponent,

    HeaderGeneralComponent,
    FooterGeneralComponent
  ],
  exports:[
    HeaderIsLoginComponent,
    FooterIsLoginComponent,

    HeaderGeneralComponent,
    FooterGeneralComponent
  ]
})
export class LayoutModule { }
