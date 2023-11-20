import { Component, OnInit } from '@angular/core';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginUser: any = null;

  constructor( private service: OdnService){}

  public itemRef:any;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.getData();
  }

  edit(){
    console.log('edit');
  }

  getData(){
    let params = '';
    this.service.findAll(params).subscribe( g => {
      // console.log('g',g)
      this.itemRef = g;
    });
  }

}
