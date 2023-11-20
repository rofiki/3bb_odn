import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DbService } from '../base/db.service';


@Injectable({
  providedIn: 'root'
})
export class OdnService {

  constructor(private http: HttpClient, private dbService: DbService) {}

  private apiUrl: string = this.dbService.getServiceURL() + '/odn';

  findAll(params:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + params);
  }

  genOdnCode()
  {
    
  }

}
