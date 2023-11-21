import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddOdnComponent } from './add-odn/add-odn.component';
import { EditOdnComponent } from './edit-odn/edit-odn.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditProgressComponent } from './edit-progress/edit-progress.component';
import { DetailOdnComponent } from './detail-odn/detail-odn.component';
import { SettingComponent } from './setting/setting.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: AddOdnComponent },
  { path: 'edit/:id', component: EditComponent },
  // { path: 'plan/:id', component: EditPlanComponent },
  // { path: 'progress/:id', component: EditProgressComponent },
  { path: 'detail/:id', component: DetailOdnComponent },
  { path: 'setting', component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingListOdnRoutingModule { }
