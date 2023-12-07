import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/services/base/app.service';

import Swal from 'sweetalert2';
import { SwalOption } from 'src/app/shared/sweetalert2.option.directive';

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
  public BASE_URL: string = this.appService.BASE_URL;

  // add css
  public planCss: boolean = false;
  public requestCss: boolean = false;
  public verifyCss: boolean = false;
  public approveCss: boolean = false;
  public buildStartCss: boolean = false;
  public buildFinishCss: boolean = false;
  public buildCloseCss: boolean = false;

  // sweetalert2
  public swalOption = new SwalOption;

  constructor(
    private service: OdnService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
    // console.log(this.loginUser);

    this.getData();
  }

  public getData() {

    this.service.findById(this.id).subscribe(r => {
      this.itemRef = r.data;

      if ((this.itemRef.odn_build_start_date) && (this.itemRef.odn_build_finish_date)) 
      {
        let start: any = new Date(this.itemRef.odn_build_start_date);
        let end: any = new Date(this.itemRef.odn_build_finish_date);
        let dayBuildCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        this.itemRef.dayBuildCount = (dayBuildCount + 1);
      } else {
        this.itemRef.dayBuildCount = 0;
      }

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

  delOdn(value:any)
  {

    Swal.fire({
      title: "โปรดยืนยันการลบข้อมูล",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนบัน",
      cancelButtonText: "ยกเลิก",

    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(value).subscribe(res => {
          if(res.status)
          {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            })
            Toast.fire({ icon: 'success', title: 'ลบข้อมูลสำเร็จ' });
            this.router.navigate([this.BASE_URL + this.loginUser.email + '/odn']);
          }
        });
      }
    });



    // Swal.fire(this.swalOption.Warning('', 'กรุณาล๊อกอิน !!', 'ล๊อกอิน')).then((result) => {
    //   if (result.isConfirmed) {
    //     // this.router.navigate(['/login']);
    //   }
    // })
  }

}
