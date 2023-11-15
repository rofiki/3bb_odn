import { Component, OnInit } from '@angular/core';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-odn',
  templateUrl: './add-odn.component.html',
  styleUrls: ['./add-odn.component.scss']
})
export class AddOdnComponent implements OnInit {

  public loginUser: any = null;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

}
