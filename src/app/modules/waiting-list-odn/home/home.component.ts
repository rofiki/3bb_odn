import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

import { Subject, takeUntil } from 'rxjs';
import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public loginUser: any = null;

  constructor(
    private service: OdnService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  public componentDestroyed$: Subject<boolean> = new Subject()

  public isProcess: boolean = false;
  public showTable: boolean = false;

  //status
  public finishJobStatus: boolean = false;
  public buildStatus: boolean = false;
  public approveStatus: boolean = false;
  public verifyStatus: boolean = false;
  public requestStatus: boolean = false;
  public planStatus: boolean = false;
  public startStatus: boolean = false;

  public odnStatus: any;

  public itemRef: any;

  public start: number = 0;
  public limit: number = 25;
  public search: string = '';

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.getData();
  }

  edit(id: number) {
    this.router.navigate(['../detail', id], { relativeTo: this.route });
  }

  async getData() {

    this.showTable = false;
    this.isProcess = true;
    // this.itemRef = await lastValueFrom(this.service.findAll({ search: this.search, start: this.start, limit: this.limit }));
    this.service.findAll({ search: this.search, start: this.start, limit: this.limit }).pipe(takeUntil(this.componentDestroyed$)).subscribe(res => {
      this.itemRef = res;
      this.isProcess = false;
      this.showTable = true;

      this.itemRef.data.forEach((element: any) => {
        console.log(element);
        this.finishJobStatus = (element.odn_build_close_job) ? true : false;
        this.buildStatus = (element.odn_build_start_date) ? true : false;
        this.approveStatus = (element.odn_approve_date) ? true : false;
        this.verifyStatus = (element.odn_verify_date) ? true : false;
        this.requestStatus = (element.odn_code_from_3bbodn) ? true : false;
        this.planStatus = (element.odn_plan_date) ? true : false;
        this.startStatus = (element.odn_added_date) ? true : false;
      });

      // array.forEach(element => {

      // });


    });

    // console.log(this.itemRef);

  }

  public pageEventChange(start: number = 0, limit: number = 25, search: string = '') {

    this.isProcess = true;
    this.showTable = false;

    // TODO : get all,
    this.service.findAll({ search: search, start: start, limit: limit }).pipe(takeUntil(this.componentDestroyed$)).subscribe({

      next: result => {
        this.itemRef = result;

        this.isProcess = false;
        this.showTable = true;

      },
      error: refError => {
        console.log(refError);
        this.isProcess = false;
        this.showTable = true;
      }
    })

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

}
