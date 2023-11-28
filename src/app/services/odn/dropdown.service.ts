import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DbService } from '../base/db.service';
import { ProvinceService } from './province.service';
import { UsersService } from './users.service';

import { lastValueFrom, Subject, Subscription, takeUntil, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient, 
    private dbService: DbService,
    private provinceService: ProvinceService,
    private usersService: UsersService,
    ) {}

  public componentDestroyed$: Subject<boolean> = new Subject()

  public province:any;
  public users:any;
  public approveList:any;

  async get(){
    // this.province = this.provinceService.findAll().subscribe();
    this.province = await lastValueFrom(this.provinceService.findAll());
    this.users = await lastValueFrom(this.usersService.findAll());
    this.approveList = this.approve();
    return {
      province: this.province.data,
      users: this.users.data,
      approve: this.approveList
    };
  }

  approve(){
    return [
      {id:'finishJob', text:'สร้างเสร็จ'},
      {id:'build', text:'ดำเนินการสร้าง'},
      {id:'approve', text:'approve'},
      {id:'verify', text:'Verify'},
      {id:'request', text:'บันทึกขออนุมัติ ODN'},
      {id:'plan', text:'Plan งานขยาย'},
      {id:'start', text:'บันทึกข้อมูล'}
    ]
  }


}
