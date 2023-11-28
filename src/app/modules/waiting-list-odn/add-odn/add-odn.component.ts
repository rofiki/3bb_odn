import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { jwtDecode } from 'jwt-decode';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/base/app.service';
import { OrgService } from 'src/app/services/odn/org.service';
import { ProvinceService } from 'src/app/services/odn/province.service';
import { UsersService } from 'src/app/services/odn/users.service';


// sweetalert2
import Swal from 'sweetalert2'
import { SwalOption } from 'src/app/shared/sweetalert2.option.directive';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { OdnService } from 'src/app/services/odn/odn.service';


@Component({
  selector: 'app-add-odn',
  templateUrl: './add-odn.component.html',
  styleUrls: ['./add-odn.component.scss']
})
export class AddOdnComponent implements OnInit {

  public loginUser: any = null;
  public BASE_URL: string = this.appService.BASE_URL;

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private orgService: OrgService,
    private provinceService: ProvinceService,
    private usersService: UsersService,
    private service: OdnService,

    private router: Router,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
  ) { }

  public componentDestroyed$: Subject<boolean> = new Subject()
  public swalOption = new SwalOption;
  public aform!: FormGroup;
  public isProcess: boolean = false;

  public orgRef: any
  public provinceRef: any;
  public userRef: any;
  public odnUserRef: any

  // loding
  public getOrgLoading: boolean = false;
  public getProvinceLoading: boolean = false;
  public getOdnUsersLoading: boolean = false;
  public getGenCode: boolean = false;

  ngOnInit(): void {

    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.getOrgLoading = false;
    this.getOdnUsersLoading = false;
    this.getOdnUsersLoading = false;
    this.getGenCode = false;

    this.localeService.use('th');

    this.isLogin(); // ตรวจสอบ login
    this.getOrg();
    this.getProvince();
    this.getOdnUsers();
    this.genCode();

    this.aform = this.fb.group({
      odn_code: this.fb.control('', []),
      org_id: this.fb.control('', [Validators.required]),
      odn_added_date: this.fb.control('', [Validators.required]),
      odn_request_user_id: this.fb.control('', [Validators.required]),
      odn_place: this.fb.control('', [Validators.required,]),
      province_id: this.fb.control('', [Validators.required,]),
      odn_location: this.fb.control('', [Validators.required,]),
      odn_sale_num: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      odn_sale_chance: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });

    this.aform.patchValue({
      odn_added_date: new Date(),
    });

  }

  isLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire(this.swalOption.Warning('', 'กรุณาล๊อกอิน !!', 'ล๊อกอิน')).then((result) => {
        if (result.isConfirmed) {
          this.isProcess = false;
          this.router.navigate(['/login']);
        }
      })
    }

  }

  getOrg() {
    this.orgService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(org => {
      this.orgRef = org;
      this.getOrgLoading = true;
    });
  }

  getProvince() {
    this.provinceService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(province => {
      this.provinceRef = province;
      this.getProvinceLoading = true;
    });
  }

  getOdnUsers() {
    this.usersService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(odnUser => {
      this.odnUserRef = odnUser;
      this.getOdnUsersLoading = true;
    });
  }


  public async onSubmit() {

    let swalOption = this.swalOption;
    let params = this.aform.value;

    params.odn_added_date = this.datePipe.transform(params.odn_added_date, 'yyyy-MM-dd hh:mm:ss');

    let location = params.odn_location;
    let lat1 = location.substr(0, 1);
    let lat2 = location.substr(1, 6);
    let long1 = location.substr(7, 3);
    let long2 = location.substr(10, 6);
    params.lat = lat1 + '.' + lat2;
    params.long = long1 + '.' + long2;
    params.odn_location = params.lat + ', ' + params.long;


    Swal.fire(swalOption.Confirm('')).then((result) => {
      if (result.isConfirmed) {

        this.service.create(params).pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
          // console.log('r', r);
          if (r.status) {
            Swal.fire({
              icon: "success",
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            }).then(result => {
              if (result.isDismissed) {
                this.router.navigate(['../home'], { relativeTo: this.activatedRoute });
              }
            });

          }
        });

      }
    }); // end โปรดยืนยันการลงทะเบียนขอใช้งานระบบ
  }

  public genCode() {
    this.service.genCode().pipe(takeUntil(this.componentDestroyed$)).subscribe(g => {
      console.log('g',g);
      this.aform.patchValue({
        odn_code: g.new_odncode,
      });
      this.getGenCode = true;
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

}
