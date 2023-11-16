import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { Subject } from 'rxjs';
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
      users_usersname: this.fb.control('', [Validators.required, Validators.email]),
      users_password: this.fb.control('', [Validators.required]),
      users_detail_firstname: this.fb.control('', [Validators.required]),
      users_detail_lastname: this.fb.control(null),
      users_password_confirm: this.fb.control(null, [Validators.required,])
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

  onSubmit(){

  }

}
