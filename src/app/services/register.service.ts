import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DbService } from './base/db.service';
import { Observable } from 'rxjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private dbService: DbService) {}

  private apiUrl: string = this.dbService.getServiceURL() + '/users';

    // create(createUserDto: CreateUserDto) {
    // return this.usersRepository.save(createUserDto);

    // public create(params: {}): Observable<any> {
    //   return this.http.post(this.apiUrl + '/', params);
    // }

        // /register-google
    RegisterByGoogle(params: {}): Observable<any> {
      return this.http.post(this.apiUrl + '/register-google', params);
    }

    findByEmail(email: string): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/email/' + email);
    }

    public create(params: {}): Observable<any> {
      return this.http.post(this.apiUrl + '', params);
    }
    

}
