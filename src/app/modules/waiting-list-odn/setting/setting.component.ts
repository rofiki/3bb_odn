import { Component, OnInit } from '@angular/core';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor() { }

  public loginUser: any = null;

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

}
