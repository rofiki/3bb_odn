import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DbService } from '../base/db.service';
import { AppService } from 'src/app/services/base/app.service';


@Injectable({
  providedIn: 'root'
})
export class OdnService {

  constructor(
    private http: HttpClient, 
    private dbService: DbService, 
    private appService : AppService
  ) {}

  private apiUrl: string = this.dbService.getServiceURL() + '/odn/odn';

  findAll(params : { search? : string, start : number, limit : number }): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + this.appService.getQueryString(params));
  }

  findById(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  public create(params: {}): Observable<any> {
    // console.log('param = ', params);

    return this.http.post(this.apiUrl + '/', params);
  }

  public update(params: {}): Observable<any> {
    console.log('param = ', params);
    return this.http.put(this.apiUrl + '/', params);
  }

  genCode(): Observable<any> {
    return this.http.get<any>(this.dbService.getServiceURL() + '/genodncode' );
  }

}
