import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

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
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
    ){}

  public isProcess:boolean = false;
  public showTable:boolean = false;

  public itemRef:any;

	public start : number = 0;
	public limit : number = 25;
  public search: string = '';

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.getData();
  }

  edit(id:number){
    console.log('edit');
    this.router.navigate(['../detail',id], { relativeTo: this.activatedRoute });
  }

  async getData(){
    
    this.showTable = false;
    this.isProcess = true; // เริ่มทำงาน
    this.itemRef = await lastValueFrom(this.service.findAll({ search: this.search, start: this.start, limit: this.limit }));
    this.isProcess = false; // หยุดทำงาน
    this.showTable = true;
    console.log(this.itemRef);

  }

  public pageEventChange(start:number = 0, limit:number = 25, search:string = '') {

		this.isProcess = true;
    this.showTable = false;

		// TODO : get all,
		this.service.findAll( { search: search, start : start , limit : limit }).subscribe({			

			next :  result => {
				this.itemRef = result;
	  	  
				this.isProcess = false;
        this.showTable = true;

			  } ,
			error : refError => {
				console.log(refError);
				this.isProcess = false;
        this.showTable = true;
			  }
		})
		
	}

}
