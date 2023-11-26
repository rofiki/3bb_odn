import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"

import { jwtDecode } from 'jwt-decode';
import { AppService } from 'src/app/services/base/app.service';

// sweetalert2
import Swal from 'sweetalert2'
import { SwalOption } from 'src/app/shared/sweetalert2.option.directive';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit-password',
  templateUrl: './profile-edit-password.component.html',
  styleUrls: ['./profile-edit-password.component.scss']
})
export class ProfileEditPasswordComponent implements OnInit, OnDestroy {

  public loginUser: any = null;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  public componentDestroyed$: Subject<boolean> = new Subject()
  public isProcess: boolean = false;
  public aform!: FormGroup;
  public numRegex = /^-?\d*[.,]?\d{0,2}$/;
  public userLogin: any;

  public swalOption = new SwalOption;

  ngOnInit(): void {

    const token: any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
    this.loadData();
  }

  public loadData() {

    // เช็ค password confirmpassword เหมือนกันไหม
    const matchpassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

      let password = control.get('users_password');
      let confirmPassword = control.get('users_password_confirm');

      if (password && confirmPassword && password?.value != confirmPassword?.value) {
        return {
          passwordMatchError: true,
        }
      }

      return null;
    }

    if(this.loginUser.provider == 'WEB'){ // ถ้าสมัครผ่านเว็บ
      this.aform = this.fb.group({
        old_password: this.fb.control(null, [Validators.required]),
        users_password: this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
        users_password_confirm: this.fb.control(null, [Validators.required,]),
      }, {
        validators: matchpassword
      });

    }else if(this.loginUser.provider == 'GOOGLE'){ // ถ้าสมัครผ่าน google account
      this.aform = this.fb.group({
        // old_password: this.fb.control(null, [Validators.required]),
        users_password: this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
        users_password_confirm: this.fb.control(null, [Validators.required,]),
      }, {
        validators: matchpassword
      });

    }



  }

  public async onSubmit() {

    let swalOption = this.swalOption;
    let params = this.aform.value;


    Swal.fire(swalOption.Confirm('')).then((result) => {
      if (result.isConfirmed) {

        params.users_id = this.loginUser.users_id;
        params.users_usersname = this.loginUser.email;
        params.provider = this.loginUser.provider;
        if(this.loginUser.profile == 'GOOGLE')
        {
          params.old_password = 'GOOGLE';
        }
        this.service.changePassword(params).pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
          if (!r.status) {
            this.aform.reset();
            Swal.fire(swalOption.Warning('', r.message)).then((result) => {
              if (result.isConfirmed) {
                this.aform.reset();
              }
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "แก้ไขรหัสผ่านเรียบร้อย",
              showConfirmButton: true,
              allowOutsideClick:false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.aform.reset();

                let logout_params = { log: this.loginUser.tokenLog }
                this.service.logout(logout_params).pipe(takeUntil(this.componentDestroyed$)).subscribe( logout => { console.log('logout', logout)});

                Swal.fire({
                  title: "คุณต้องล๊อกอินเข้าสู่ระบบใหม่",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "หน้าล๊อกอิน",
                  allowOutsideClick:false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("islogin");
                    localStorage.removeItem("log");
                    window.location.href = '/login';
                  }
                });
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
