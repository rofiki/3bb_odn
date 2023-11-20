import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DbService } from '../base/db.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private dbService: DbService) {}

  private apiUrl: string = this.dbService.getServiceURL() + '/odn/users';

  findAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  findById(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

}
