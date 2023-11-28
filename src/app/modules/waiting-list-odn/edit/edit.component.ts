import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

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

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public loginUser: any = null;
  public id: any = this.route.snapshot.paramMap.get('id');
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
    private route: ActivatedRoute,
  ) { }


  public componentDestroyed$: Subject<boolean> = new Subject()
  public swalOption = new SwalOption;
  public aform!: FormGroup;
  public isProcess: boolean = false;

  public orgRef: any
  public provinceRef: any;
  public userRef: any;
  public odnUserRef: any
  public itemRef: any = null;

  // loding
  public getOrgLoading: boolean = false;
  public getProvinceLoading: boolean = false;
  public getOdnUsersLoading: boolean = false;

  async ngOnInit() {
    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.isProcess = true;
    this.service.findById(this.id).pipe().subscribe(item => {
      this.itemRef = item.data;
      // console.log('item',item)

      this.aform = this.fb.group({
        org_id: this.fb.control('', [Validators.required]),
        odn_added_date: this.fb.control('', [Validators.required]),
        odn_request_user_id: this.fb.control('', [Validators.required]),
        odn_place: this.fb.control('', [Validators.required,]),
        province_id: this.fb.control('', [Validators.required,]),
        odn_location: this.fb.control('', [Validators.required,]),
        odn_sale_num: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        odn_sale_chance: this.fb.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      });

      this.localeService.use('th');
      this.aform.patchValue({
        odn_added_date: new Date(this.itemRef.odn_added_date),
      });

      this.isProcess = false;
    });

    await this.isLogin(); // ตรวจสอบ login
    await this.getProvince();
    await this.getOdnUsers();
    await this.getOrg();
  }

  async isLogin() {
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

  async getOrg() {
    this.orgService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(org => {
      this.orgRef = org;
      this.getOrgLoading = true;
    });
  }

  async getProvince() {
    this.provinceService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(province => {
      this.provinceRef = province;
      this.getProvinceLoading = true;
    });
  }

  async getOdnUsers() {
    this.usersService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(odnUser => {
      this.odnUserRef = odnUser;
      this.getOdnUsersLoading = true;
    });
  }

  public async onSubmit() {

    let swalOption = this.swalOption;
    let params = this.aform.value;
    // console.log('1',params);

    params.odn_added_date = this.datePipe.transform(params.odn_added_date, 'yyyy-MM-dd hh:mm:ss');

    let location = params.odn_location.replace(',',''); //ตัด , ออก
    location = location.replace(' ',''); // ตัดเคาะออก
    location = location.replace('.',''); // ตัด . ออก
    location = location.replace('.',''); // ตัด . ออก

    let lat1 = location.substr(0, 1);
    let lat2 = location.substr(1, 6);
    let long1 = location.substr(7, 3);
    let long2 = location.substr(10, 6);
    params.lat = lat1 + '.' + lat2;
    params.long = long1 + '.' + long2;
    params.odn_location = params.lat + ', ' + params.long;
    params.id = this.id;

    Swal.fire(swalOption.Confirm('')).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigate(['../../detail',this.id], { relativeTo: this.route });
        this.service.update(params).pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
          // console.log('r', r);
          if (r.status) {
            Swal.fire({
              icon: "success",
              title: r.message,
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            }).then(result => {
              if (result.isDismissed) {
                this.router.navigate(['../../detail',this.id], { relativeTo: this.route });
                // this.ngOnInit();
              }
            });

          }
        });

      }
    }); // end โปรดยืนยันการลงทะเบียนขอใช้งานระบบ

  }

}
