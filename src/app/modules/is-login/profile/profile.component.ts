import { Component, Input, OnInit, Output } from '@angular/core';

import { jwtDecode } from 'jwt-decode';
import { AppService } from 'src/app/services/base/app.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @Output() appName:string ='personnel';

  public loginUser: any = null;
  public BASE_URL:string = this.appService.BASE_URL;

  constructor(
    private appService: AppService,
  ){}

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

}
