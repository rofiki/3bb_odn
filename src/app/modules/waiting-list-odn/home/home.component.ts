import { Component, OnInit } from '@angular/core';
import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginUser: any = null;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

}
