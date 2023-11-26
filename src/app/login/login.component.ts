import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from "rxjs/operators"
import { Subject } from 'rxjs';

// google
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap'
import { GoogleService } from '../services/google.service';

// service
import { AppService } from '../services/base/app.service';
import { AuthService } from '../services/auth.service';
// import { UsersDetailService } from '../services/users-detail.service';
import { LoginService } from '../services/login.service';
// import { IpServiceService } from '../services/ip-service.service';

// sweetalert2
import Swal from 'sweetalert2'
import { SwalOption } from '../shared/sweetalert2.option.directive';

import { jwtDecode } from 'jwt-decode';
import * as cryptoJS from 'crypto-js';
// import * as jwt from 'jsonwebtoken'; ไม่เวิร์ค


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private appService: AppService,
    private google: GoogleService,
    private loginService: LoginService,
    // private ip: IpServiceService,
    private _ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  public componentDestroyed$: Subject<boolean> = new Subject()
  public isProcess: boolean = false;
  public swalOption = new SwalOption;
  public ipAddress: any;

  public loginUser: any = null;
  public isLogin: boolean = (localStorage.getItem('islogin') == '1') ? true : false;
  public loading:boolean = false;
  public BASE_URL:string = this.appService.BASE_URL;

  public loginForm!: FormGroup;

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    if (token) {
      this.loginUser = jwtDecode(token);
    }

    if (!this.isLogin) {
      this.google.library({ callback: this.loginWithGoogle.bind(this) });
    }

    this.loginForm = this.fb.group({
      users_usersname: this.fb.control('', [Validators.required, Validators.email]),
      users_password: this.fb.control('', [Validators.required]),
    });

  }

  async loginWithGoogle(response: CredentialResponse) {

    const responseUser: any = jwtDecode(response.credential);
    let swalOption = this.swalOption;
    // let messageError: string;
    let chkIsActive: any;

    // ตรวจสอบ email
    await this.authService.findByEmail(responseUser.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(resByEmail => {
      if (!resByEmail.status) // ไม่พบอีเมล์
      {
        //'อีเมล์นี้ไม่มีในระบบ!!';
        Swal.fire(swalOption.Warning('', 'อีเมล์นี้ไม่มีในระบบ!!')).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      } else {
        chkIsActive = this.authService.checkIsActive(resByEmail.data.isActive); // ตรวจสอบสถานะ
      }


      if (chkIsActive.isLogin) { // login สำเร็จ

        const date = new Date();
        const md5_timestamp = cryptoJS.MD5(Date.now().toString()).toString();

        // ดึง รายละเอียด user
        this.authService.createToken({ email: resByEmail.data.email }).subscribe(t => {
          localStorage.setItem('token', t.token);
          localStorage.setItem('islogin', '1');
          localStorage.setItem('log', md5_timestamp);

          // this.ip.getIPAddress().subscribe(async ip => {
            // this.ipAddress = ip
            this.ipAddress.ip = '000,000,000,000';

            // บันทึกประวัติ login
            let params = {
              login_email: resByEmail.data.email,
              users_detail_id: resByEmail.data.infoId,
              tokenLog: md5_timestamp,
              login_datetime: date,
              // logout_datetime:'',
              // login_pcname:'',
              login_ip: this.ipAddress.ip,
              isLogin: 1,
            }

            this.loginService.create(params).subscribe(e => {
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
              Toast.fire({ icon: 'success', title: resByEmail.data.email + ' ล๊อกอิน สำเร็จ' });
              this._ngZone.run(() => {
                window.location.href = this.BASE_URL + resByEmail.data.email + '/odn';
                // this.router.navigate(['/callback']);
                console.log('login สำเร็จ');
              })
            });

          // });


        });

      } else { // login ไม่สำเร็จ

        Swal.fire(swalOption.Warning('', chkIsActive.messageError)).then((result) => {
          if (result.isConfirmed) {
            this.isProcess = false;
            window.location.reload();
          }
        })
      }

    });

  }

  public onSubmit() {

    this.loading = true;
      // Swal.fire({
      //   html: "<i class='fa-solid fa-spinner fa-spin fa-2xl'></i>",
      //   // timer: 2000,
      //   showConfirmButton: false,
      //   heightAuto:true
      // });

    let swalOption = this.swalOption;
    let params = this.loginForm.value;

    // this.ip.getIPAddress().subscribe(ip => {
      // this.ipAddress = ip;
      let ip = '000,000,000,000';

      params.tokenLog = ip; // this.ipAddress = ip;
      params.login_datetime = '';
      params.logout_datetime = '';
      params.login_pcname = '';
      params.login_ip = ip; // this.ipAddress = ip;
      params.isLogin = 1;

      this.authService.loginWithForm(params).subscribe(res => {
        // console.log('res', res);

        if(res.loading == false){
          //ปิด loding
          console.log('res.loading',res.loading);
        }

        if (!res.status) {
          Swal.fire(swalOption.Warning('', res.message)).then((result) => {
            if (result.isConfirmed) {
              this.loginForm.reset();
            }
          });
          console.log('login false');
        }else{

          localStorage.setItem('token', res.token);
          localStorage.setItem('islogin', '1');
          // localStorage.setItem('log', md5_timestamp);

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
          Toast.fire({ icon: 'success', title: ' ล๊อกอิน สำเร็จ' });
          this._ngZone.run(() => {
            window.location.href = this.BASE_URL + res.email + '/odn';
            // this.router.navigate(['/callback']);
            console.log('login สำเร็จ');
          })          

        }
      });

    // });

  }

  logout() {

    Swal.fire(this.swalOption.Confirm('ออกจากระบบ')).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem("token");
        localStorage.removeItem("islogin");
        localStorage.removeItem("log");
        window.location.reload();

      }
    })

  }

  ngAfterViewInit() {
    const bodyStyle = this.elementRef.nativeElement.ownerDocument.body.style;
    bodyStyle.background = 'url(' + this.BASE_URL +'assets/wallpaper/wallpaper_or1.jpg)';
  }

}
