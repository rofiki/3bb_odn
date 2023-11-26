import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DbService } from './base/db.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDetailService {

  constructor(private http: HttpClient, private dbService: DbService) {}

  private apiUrl: string = this.dbService.getServiceURL() + '/users-detail';

  // create(createUserDto: CreateUserDto) {
  // return this.usersRepository.save(createUserDto);

  // public create(params: {}): Observable<any> {
  //   return this.http.post(this.apiUrl + '/', params);
  // }

  public create(params: {}): Observable<any> {
    return this.http.post(this.apiUrl, params);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  public update(params: {}): Observable<any> {
    // console.log('param = ', params);
    return this.http.put(this.apiUrl + '/', params);
  }
}
