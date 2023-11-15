import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  // public token: any = this.route.snapshot.paramMap.get('token');
  public idd: any;
  public BASE_URL:any = 'http://localhost:4200/callback';

  public islogin:any = localStorage.getItem('islogin');
  public tokenLog:any = localStorage.getItem('tokenLog');
  public user:any = localStorage.getItem('user');
  public isloginDate:any = localStorage.getItem('isloginDate');
  public token:any = localStorage.getItem('token');


  ngOnInit(): void {



    this.route.paramMap.subscribe(result =>
      {
          // console.log(`id: ${result.get('id')}`);
          // console.log(`name: ${result.get('name')}`);     
          console.log('result',result);  
      }); 

  }



}
