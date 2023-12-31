import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsLoginRoutingModule } from './is-login-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileEditPasswordComponent } from './profile/profile-edit-password/profile-edit-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';

import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';
import { LayoutModule } from '../layout/layout.module';
import { LoginedManageComponent } from './profile/logined-manage/logined-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    ProfileEditPasswordComponent,
    DashboardComponent,
    LogoutComponent,
    LoginedManageComponent,
  ],
  imports: [
    CommonModule,
    IsLoginRoutingModule,
    Bootstrap5Module,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class IsLoginModule { }
