import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/base/app.service';
import { LoginService } from 'src/app/services/login.service';


// sweetalert2
import Swal from 'sweetalert2'
import { SwalOption } from 'src/app/shared/sweetalert2.option.directive';

@Component({
  selector: 'app-add-odn',
  templateUrl: './add-odn.component.html',
  styleUrls: ['./add-odn.component.scss']
})
export class AddOdnComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private loginService: LoginService,
    private _ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder,
  )
  {}

  public componentDestroyed$: Subject<boolean> = new Subject()
  public isProcess: boolean = false;
  public swalOption = new SwalOption;
  public aform!: FormGroup;

  public loginUser: any = null;
  public token: any = localStorage.getItem('token');

  ngOnInit(): void {
    this.isLogin(); // ตรวจสอบ login
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);

    this.aform = this.fb.group({
      odn_code: this.fb.control(null, [Validators.required,]),
      org_id: this.fb.control('', [Validators.required]),
      odn_added_date: this.fb.control('', [Validators.required]),
      odn_request_user_id: this.fb.control('', [Validators.required]),
      odn_place: this.fb.control(null, [Validators.required,]),
      province_id: this.fb.control(null, [Validators.required,]),
      odn_location: this.fb.control(null, [Validators.required,]),
      odn_sale_num: this.fb.control(null, [Validators.required,]),
      odn_sale_chance: this.fb.control(null, [Validators.required]),
    });
  }

  isLogin(){
    const token = localStorage.getItem('token');
    if(!token){
      Swal.fire(this.swalOption.Warning('', 'กรุณาล๊อกอิน !!','ล๊อกอิน')).then((result) => {
        if (result.isConfirmed) {
          this.isProcess = false;
          this.router.navigate(['/login']);
        }
      })
    }

  }

  public async onSubmit() {

    let swalOption = this.swalOption;
    let params = this.aform.value;

    Swal.fire(swalOption.Confirm('')).then((result) => {
      if (result.isConfirmed) {

        console.log(params);

        // // ตรวจสอบ email มีในระบบรึยัง
        // this.service.findByEmail(params.users_usersname).pipe(takeUntil(this.componentDestroyed$))
        //   .subscribe(resByEmail => {

        //     if (resByEmail.data) {

        //       Swal.fire(swalOption.Warning("Email: " + params.users_usersname, "อีเมล์นี้ มีอยู่ในระบบแล้ว!")).then((result) => {
        //         if (result.isConfirmed) {
        //           this.isProcess = false;
        //         }
        //       })

        //     } else {

        //       this.service.create(params)
        //       .pipe(takeUntil(this.componentDestroyed$))
        //       .subscribe(res => {

        //         // บันทึกสำเร็จ
        //         if (res.status) {
        //           Swal.fire(swalOption.Success('ลงทะเบียนเรียบร้อย!', "Email: " + res.email, 'หน้าล๊อกอิน')).then((result) => {
        //             if (result.isConfirmed) {
        //               window.location.href = '/login';
        //             }
        //           })
        //         }
        //       });

        //     }

        //   }); // End findByEmail
      }
    }); // end โปรดยืนยันการลงทะเบียนขอใช้งานระบบ
  }

}
