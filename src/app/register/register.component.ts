import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"

// Social
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";

// service
import { AppService } from '../services/base/app.service';
import { RegisterService } from '../services/register.service';
import { UsersDetailService } from '../services/users-detail.service';

// sweetalert2
import Swal from 'sweetalert2'
import { SwalOption } from '../shared/sweetalert2.option.directive';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    private elementRef: ElementRef,
    private authService: SocialAuthService,
    private service: RegisterService,
    private usersDetailService: UsersDetailService,
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  public componentDestroyed$: Subject<boolean> = new Subject()
  public user!: SocialUser;
  public loggedIn!: boolean;
  public isProcess: boolean = false;
  public registerForm!: FormGroup;
  public numRegex = /^-?\d*[.,]?\d{0,2}$/;
  public swalOption = new SwalOption;

  ngOnInit(): void {
    this.signupGoogle(); // singup by google
    this.signupWithForm(); // signup by webform
  }

  // signup Google
  signupGoogle() {
    let swalOption = this.swalOption;

    this.authService.authState.pipe(takeUntil(this.componentDestroyed$)).subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if (this.loggedIn) {
        // ตรวจสอบ email มีในระบบรึยัง
        this.service.findByEmail(this.user.email).pipe(takeUntil(this.componentDestroyed$))
          .subscribe(resByEmail => {
            console.log(resByEmail);
            if (resByEmail.status) {
              Swal.fire(swalOption.Warning("Email: " + this.user.email, "อีเมล์นี้ มีอยู่ในระบบแล้ว!")).then((result) => {
                if (result.isConfirmed) {
                  this.isProcess = false;
                  window.location.reload();
                }
              })
            } else {
              // อีเมล์นี้ยังไม่มีในระบบ // เพิ่มใน users
              let params = {
                users_gg_id: this.user.id,
                users_usersname: this.user.email,
                users_password: null,
                provider: this.user.provider,
                users_detail_firstname: this.user.firstName,
                users_detail_lastname: this.user.lastName,                
              }
              this.service.RegisterByGoogle(params)
                .pipe(takeUntil(this.componentDestroyed$))
                .subscribe(gg => {
                  Swal.fire(swalOption.Success('ลงทะเบียนเรียบร้อย!', "Email: " + gg.email, 'หน้าล๊อกอิน')).then((result) => {
                    if (result.isConfirmed) {
                      this.isProcess = false;
                      window.location.href = '/login';
                    }
                  })

                });

            }

          });

      }

    });
  }

  signupWithForm() {

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

    this.registerForm = this.fb.group({
      users_usersname: this.fb.control('', [Validators.required, Validators.email]),
      users_password: this.fb.control('', [Validators.required]),
      users_detail_firstname: this.fb.control('', [Validators.required]),
      users_detail_lastname: this.fb.control(null),
      users_password_confirm: this.fb.control(null, [Validators.required,])
    }, {
      validators: matchpassword
    });
  }

  public async onSubmit() {

    let swalOption = this.swalOption;
    let params = this.registerForm.value;

    Swal.fire(swalOption.Confirm('โปรดยืนยันการลงทะเบียนขอใช้งานระบบ')).then((result) => {
      if (result.isConfirmed) {

        // ตรวจสอบ email มีในระบบรึยัง
        this.service.findByEmail(params.users_usersname).pipe(takeUntil(this.componentDestroyed$))
          .subscribe(resByEmail => {

            if (resByEmail.data) {

              Swal.fire(swalOption.Warning("Email: " + params.users_usersname, "อีเมล์นี้ มีอยู่ในระบบแล้ว!")).then((result) => {
                if (result.isConfirmed) {
                  this.isProcess = false;
                }
              })

            } else {

              this.service.create(params)
              .pipe(takeUntil(this.componentDestroyed$))
              .subscribe(res => {

                // บันทึกสำเร็จ
                if (res.status) {
                  Swal.fire(swalOption.Success('ลงทะเบียนเรียบร้อย!', "Email: " + res.email, 'หน้าล๊อกอิน')).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = '/login';
                    }
                  })
                }
              });

            }

          }); // End findByEmail
      }
    }); // end โปรดยืนยันการลงทะเบียนขอใช้งานระบบ
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  // css style
  bodyStyle() {
    const bodyStyle = this.elementRef.nativeElement.ownerDocument.body.style;
    // bodyStyle.background = 'Radial-Gradient(Ellipse At Center,#Fffeea 0%,#Fffeea 35%,#880c48 100%)';
    // bodyStyle.background = 'url(https://hrgproject.com/hrg-dev/contractor/dist/img/bg_login.jpg)';
    bodyStyle.background = 'url(/assets/wallpaper/wallpaper_or1.jpg)';
    // bodyStyle.backgroundSize = 'cover';
  }

  ngAfterViewInit() {
    this.bodyStyle(); // body css style
  }

}