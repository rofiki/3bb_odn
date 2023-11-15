import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingListOdnRoutingModule } from './waiting-list-odn-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutModule } from './layout/layout.module';
import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';
import { AddOdnComponent } from './add-odn/add-odn.component';
import { EditOdnComponent } from './edit-odn/edit-odn.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditProgressComponent } from './edit-progress/edit-progress.component';
import { DetailOdnComponent } from './detail-odn/detail-odn.component';
import { SettingComponent } from './setting/setting.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddOdnComponent,
    EditOdnComponent,
    EditPlanComponent,
    EditProgressComponent,
    DetailOdnComponent,
    SettingComponent,
  ],
  imports: [
    CommonModule,
    WaitingListOdnRoutingModule,
    LayoutModule,
    HeaderComponent,
    FooterComponent,
    Bootstrap5Module,
  ]
})
export class WaitingListOdnModule { }
