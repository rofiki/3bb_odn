import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { CallbackComponent } from './callback/callback.component';
import { FortestComponent } from './fortest/fortest.component';

import { jwtDecode } from 'jwt-decode';

const token:any = localStorage.getItem('token');
let users_email:any = null;
if(token){
  const loginUser: any = jwtDecode(token);
  users_email = loginUser.email;
} else {
  users_email = 'not-found';
}


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  { path: 'fortest', component: FortestComponent }, // ไว้สำหรับ test

  // { path: 'authen', component: AuthenComponent },
  { path: 'logout', component: LogoutComponent }, // ไม่ได้ใช้งาน
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'callback', component: CallbackComponent }, // ไม่ได้ใช้งาน
  { path: users_email, loadChildren: () => import('./modules/is-login/is-login.module').then((m) => m.IsLoginModule) },
  { path: users_email+'/odn', loadChildren: () => import('./modules/waiting-list-odn/waiting-list-odn.module').then((m) => m.WaitingListOdnModule) },
  { path: '**', component: NotFoundComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // useHash:true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
