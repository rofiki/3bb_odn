import { Component, OnInit } from '@angular/core';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit-odn',
  templateUrl: './edit-odn.component.html',
  styleUrls: ['./edit-odn.component.scss']
})
export class EditOdnComponent implements OnInit {

  public loginUser: any = null;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

}
