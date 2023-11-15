import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DbService } from './base/db.service';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import * as cryptoJS from 'crypto-js';
import { UsersDetailService } from './users-detail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private dbService: DbService, private usersDetail: UsersDetailService) { }

  private apiUrl: string = this.dbService.getServiceURL() + '/users';
  private apiUrlCreateToken : string = this.dbService.getServiceURL() + '/createtoken';

  checkIsActive(isActive: number = 0) {

    let isLogin: boolean = false;
    let messageError: string = '';

    if (isActive == 2) {
      messageError = 'อีเมล์นี้ กำลังรออนุมัติ จากผู้ดูแลระบบ';
      isLogin = false;
    } else if (isActive == 0) {
      messageError = 'อีเมล์นี้ ถูกระงับการใช้งาน!! กรุณาติดต่อผู้ดูแลระบบ';
      isLogin = false;
    } else {
      isLogin = true;
    }

    return {
      messageError: messageError,
      isLogin: isLogin
    }
  }


  findByEmail(email: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/email/' + email);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  public createToken(params: {}): Observable<any> {
    return this.http.post(this.apiUrlCreateToken, params);
  }

  public loginWithForm(params: {}): Observable<any> {
    return this.http.post(this.apiUrl, params);
  }

}
