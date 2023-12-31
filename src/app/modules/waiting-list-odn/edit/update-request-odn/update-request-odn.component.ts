import { Component, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
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

@Component({
  selector: 'app-update-request-odn',
  templateUrl: './update-request-odn.component.html',
  styleUrls: ['./update-request-odn.component.scss']
})
export class UpdateRequestOdnComponent implements OnInit, OnDestroy {

  public id: any = this.route.snapshot.paramMap.get('id');

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
  public itemRef: any = null;
  public odnUserRef: any

  // loading
  public getOdnUsersLoading: boolean = false;

  async ngOnInit() {

    this.isProcess = true;
    this.getOdnUsersLoading = false;

    await this.getOdnUsers();
    this.service.findById(this.id).pipe().subscribe(item => {
      this.itemRef = item.data;

      this.aform = this.fb.group({
        odn_request_date: this.fb.control(null, [Validators.required]),
        odn_code_from_3bbodn: this.fb.control(null, [Validators.required]),
        odn_request_users_id: this.fb.control(null, [Validators.required]),
      });

      this.localeService.use('th');
      if(this.itemRef.odn_request_date){
        this.aform.patchValue({
          odn_request_date: new Date(this.itemRef.odn_request_date),
        });
      }

      this.isProcess = false;
    });

  }

  async getOdnUsers() {
    this.getOdnUsersLoading = false;
    this.usersService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(odnUser => {
      this.odnUserRef = odnUser;
      this.getOdnUsersLoading = true;
    });
  }

  public async onSubmit() {

    let swalOption = this.swalOption;
    let params = this.aform.value;

    params.odn_request_date = this.datePipe.transform(params.odn_request_date, 'yyyy-MM-dd hh:mm:ss');
    params.id = this.id;

    Swal.fire(swalOption.Confirm('Update บันทึกขออนุมัติ ODN')).then((result) => {
      if (result.isConfirmed) {
        this.service.updateRequest(params).pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {

          if (r.status) {
            Swal.fire({
              icon: "success",
              title: r.message,
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            }).then(result => {
              if (result.isDismissed) {
                // this.router.navigate(['../../detail',this.id], { relativeTo: this.route });
                // this.ngOnInit();
              }
            });

          }
        });

      }
    }); // end 

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
