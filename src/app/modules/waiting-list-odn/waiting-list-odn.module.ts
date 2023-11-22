import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WaitingListOdnRoutingModule } from './waiting-list-odn-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutModule } from './layout/layout.module';
import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';
import { AddOdnComponent } from './add-odn/add-odn.component';
import { EditOdnComponent } from './edit/edit-odn/edit-odn.component';
// import { EditPlanComponent } from './edit-plan/edit-plan.component';
// import { EditProgressComponent } from './edit-progress/edit-progress.component';
import { DetailOdnComponent } from './detail-odn/detail-odn.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { EditComponent } from './edit/edit.component';
import { UpdateRequestOdnComponent } from './edit/update-request-odn/update-request-odn.component';
import { UpdateVerifyComponent } from './edit/update-verify/update-verify.component';
import { UpdateApproveComponent } from './edit/update-approve/update-approve.component';
import { UpdateBuildComponent } from './edit/update-build/update-build.component';
import { UpdatePlanComponent } from './edit/update-plan/update-plan.component';


ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
@NgModule({
  declarations: [
    HomeComponent,
    AddOdnComponent,
    EditOdnComponent,
    DetailOdnComponent,
    SettingComponent,
    EditComponent,
    UpdateRequestOdnComponent,
    UpdateVerifyComponent,
    UpdateApproveComponent,
    UpdateBuildComponent,
    UpdatePlanComponent
    // EditPlanComponent,
    // EditProgressComponent,
  ],
  imports: [
    CommonModule,
    WaitingListOdnRoutingModule,
    LayoutModule,
    HeaderComponent,
    FooterComponent,
    Bootstrap5Module,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask(),DatePipe] 
})
export class WaitingListOdnModule { }
