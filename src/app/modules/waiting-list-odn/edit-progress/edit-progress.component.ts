import { Component, OnInit } from '@angular/core';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit-progress',
  templateUrl: './edit-progress.component.html',
  styleUrls: ['./edit-progress.component.scss']
})
export class EditProgressComponent implements OnInit {

  public loginUser: any = null;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

}
