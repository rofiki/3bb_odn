import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-odn',
  templateUrl: './detail-odn.component.html',
  styleUrls: ['./detail-odn.component.scss']
})
export class DetailOdnComponent implements OnInit {

  public loginUser: any = null;
  public id: any = this.route.snapshot.paramMap.get('id');
  public itemRef: any = null;
  public verifyApproveRef:any = null;
  public approveApproveRef:any = null;

  // add css
  public planCss: boolean = false;
  public requestCss: boolean = false;
  public verifyCss: boolean = false;
  public approveCss: boolean = false;
  public buildStartCss: boolean = false;
  public buildFinishCss: boolean = false;
  public buildCloseCss: boolean = false;

  constructor(
    private service: OdnService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.getData();
  }

  public getData() {

    this.service.findById(this.id).subscribe(r => {
      this.itemRef = r.data;

      const arr = [];
      arr[0] = 'ไม่อนุมัติ';
      arr[1] = 'อนุมัติ';
      this.verifyApproveRef = arr[this.itemRef.odn_verify_approve];
      this.approveApproveRef = arr[this.itemRef.odn_approve_approve];

      //css
      this.planCss = (this.itemRef.odn_plan_date) ? true : false;
      this.requestCss = (this.itemRef.odn_code_from_3bbodn) ? true : false;
      this.verifyCss = (this.itemRef.odn_verify_approve ) ? true : false;
      this.approveCss = (this.itemRef.odn_approve_approve ) ? true : false;
      this.buildStartCss = (this.itemRef.odn_build_start_date ) ? true : false;
      this.buildFinishCss = (this.itemRef.odn_build_finish_date ) ? true : false;
      this.buildCloseCss = (this.itemRef.odn_build_close_job ) ? true : false;
    });
  }

}
