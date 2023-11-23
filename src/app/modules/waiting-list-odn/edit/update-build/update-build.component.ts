import { Component, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/services/odn/users.service';


// sweetalert2
import Swal from 'sweetalert2'
import { SwalOption } from 'src/app/shared/sweetalert2.option.directive';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { OdnService } from 'src/app/services/odn/odn.service';

@Component({
  selector: 'app-update-build',
  templateUrl: './update-build.component.html',
  styleUrls: ['./update-build.component.scss']
})
export class UpdateBuildComponent {

  public id: any = this.route.snapshot.paramMap.get('id');

  constructor(
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
  public approveList: any = null;

  // loading
  public getOdnUsersLoading: boolean = false;

  async ngOnInit() {

    this.isProcess = true;
    this.getOdnUsersLoading = false;

    await this.getOdnUsers();
    this.approve();
    this.service.findById(this.id).pipe().subscribe(item => {
      this.itemRef = item.data;

      this.aform = this.fb.group({
        odn_build_start_date: this.fb.control(null, [Validators.required]),
        odn_build_finish_date: this.fb.control(null, []),
        odn_build_close_job: this.fb.control(null, []),
      });

      this.localeService.use('th');
      if (this.itemRef.odn_build_start_date) {
        this.aform.patchValue({
          odn_build_start_date: new Date(this.itemRef.odn_build_start_date),
        });
      }

      if (this.itemRef.odn_build_finish_date) {
        this.aform.patchValue({
          odn_build_finish_date: new Date(this.itemRef.odn_build_finish_date),
        });
      }

      if (this.itemRef.odn_build_close_job) {
        this.aform.patchValue({
          odn_build_close_job: new Date(this.itemRef.odn_build_close_job),
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

    params.odn_build_start_date = this.datePipe.transform(params.odn_build_start_date, 'yyyy-MM-dd hh:mm:ss');
    params.odn_build_finish_date = this.datePipe.transform(params.odn_build_finish_date, 'yyyy-MM-dd hh:mm:ss');
    params.odn_build_close_job = this.datePipe.transform(params.odn_build_close_job, 'yyyy-MM-dd hh:mm:ss');
    params.id = this.id;

    Swal.fire(swalOption.Confirm('Update ดำเนินการสร้าง')).then((result) => {
      if (result.isConfirmed) {
        this.service.updateBuild(params).pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
          if (r.status) {
            Swal.fire({
              icon: "success",
              title: r.message,
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            }).then(result => {
              if (result.isDismissed) {
                // this.router.navigate(['../../detail', this.id], { relativeTo: this.route });
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

  approve() {
    this.approveList = [
      { approveId: 1, approveName: 'อนุมัติ' }, { approveId: 0, approveName: 'ไม่อนุมัติ' }
    ]
  }

}
