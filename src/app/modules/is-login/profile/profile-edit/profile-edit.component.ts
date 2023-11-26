import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"

import { jwtDecode } from 'jwt-decode';
import { AppService } from 'src/app/services/base/app.service';
import { UsersDetailService } from 'src/app/services/users-detail.service';

// sweetalert2
import Swal from 'sweetalert2'
import { SwalOption } from 'src/app/shared/sweetalert2.option.directive';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  public loginUser: any = null;

  constructor(
    private service: UsersDetailService,
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  public componentDestroyed$: Subject<boolean> = new Subject()
  public isProcess: boolean = false;
  public form!: FormGroup;
  public numRegex = /^-?\d*[.,]?\d{0,2}$/;
  public userDetail:any;

  public swalOption = new SwalOption;

  ngOnInit(): void {

    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
    this.loadData();
  }

  public loadData(){
    this.service.findById(this.loginUser.users_detail_id).subscribe(uDetail => {

      this.userDetail = uDetail.data;

      this.form = this.fb.group({ 
        users_detail_firstname: this.fb.control(this.userDetail.firstname, [Validators.required, Validators.pattern('^[a-zA-Zก-๙ \-\']+')]),
        users_detail_lastname: this.fb.control(this.userDetail.lastname, [Validators.pattern('^[a-zA-Zก-๙ \-\']+')]),
        users_detail_id: this.fb.control(this.userDetail.profileId, []),

      });

      // console.log(uDetail);
    });
  }

  public async onSubmit() {

    let swalOption = this.swalOption;
    let params = this.form.value;
    console.log('params',params);

    
    Swal.fire(swalOption.Confirm('')).then((result) => {
      if (result.isConfirmed) {

        this.service.update(params).pipe(takeUntil(this.componentDestroyed$)).subscribe( r => {
          if(!r.status){
            Swal.fire(swalOption.Warning('', r.message)).then((result) => {
              if (result.isConfirmed) {
                this.loadData();
              }
            });
          }else{
            this.loadData();
            Swal.fire({
              icon: "success",
              title: "ล๊อกอินสำเร็จ",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            }).then(result=>{
              if(result.isDismissed){
                // this.loadData();
              }
            }); 
          }
        });
      }
    }); 

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

}
