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
  selector: 'app-edit-odn',
  templateUrl: './edit-odn.component.html',
  styleUrls: ['./edit-odn.component.scss'],
})
export class EditOdnComponent implements OnInit {

  public loginUser: any = null;

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
  public itemRef: any;

  // loding
  public getOrgLoading: boolean = false;
  public getProvinceLoading: boolean = false;
  public getOdnUsersLoading: boolean = false;

  public id: any = this.route.snapshot.paramMap.get('id');

  async ngOnInit() {
    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.getOrgLoading = false;
    this.getOdnUsersLoading = false;
    this.getOdnUsersLoading = false;

    this.localeService.use('th');

    this.isLogin(); // ตรวจสอบ login
    this.getOrg();
    this.getProvince();
    this.getOdnUsers();

    this.itemRef = await lastValueFrom(this.service.findById(this.id));
    console.log('itemRef', this.itemRef);

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

    // this.aform.patchValue({
    //   odn_added_date: new Date(),
    // });

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

  }

}
