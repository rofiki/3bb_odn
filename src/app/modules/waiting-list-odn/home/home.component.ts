import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

import { Subject, takeUntil } from 'rxjs';
import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/services/base/app.service';

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
    private datePipe: DatePipe,
    private appService: AppService,
  ) { }

  public componentDestroyed$: Subject<boolean> = new Subject()

  public isProcess: boolean = false;
  public showTable: boolean = false;

  public odnStatus: any;
  public itemRef: any;

  public start: number = 0;
  public limit: number = 25;
  public search: string = '';

  public BASE_URL:string = this.appService.BASE_URL;

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
      let data = res.data;
      this.isProcess = false;
      this.showTable = true;

      Object.keys(data).forEach((key: any) => {

        let finishJobStatus = (data[key].odn_build_close_job) ? true : false;
        let buildStatus = (data[key].odn_build_start_date) ? true : false;
        let approveStatus = (data[key].odn_approve_date) ? true : false;
        let verifyStatus = (data[key].odn_verify_date) ? true : false;
        let requestStatus = (data[key].odn_code_from_3bbodn) ? true : false;
        let planStatus = (data[key].odn_plan_date) ? true : false;
        let startStatus = (data[key].odn_added_date) ? true : false;

        if (finishJobStatus) {
          data[key].status = 'finish';
        } else if (buildStatus) {
          data[key].status = 'build';
        } else if (approveStatus) {
          data[key].status = 'approve';
        } else if (verifyStatus) {
          data[key].status = 'verify';
        } else if (requestStatus) {
          data[key].status = 'request_odn';
        } else if (planStatus) {
          data[key].status = 'plan';
        } else if (startStatus) {
          data[key].status = 'start';
        } else {
          data[key].status = 'start';
        }
        this.itemRef.data[key] = data[key];
      });

      // console.log(this.itemRef);
    });
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
