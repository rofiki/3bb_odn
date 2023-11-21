import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginUser: any = null;

  constructor( 
    private service: OdnService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}

  public isProcess:boolean = false;

  public itemRef:any;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.getData();
  }

  edit(id:number){
    console.log('edit');
    this.router.navigate(['../detail',id], { relativeTo: this.activatedRoute });
  }

  getData(){
    let params = '';
    this.service.findAll(params).subscribe( g => {
      // console.log('g',g)
      this.itemRef = g;
      this.isProcess = true;
    });
  }

}
