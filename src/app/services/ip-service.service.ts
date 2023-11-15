import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { switchMap, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http: HttpClient) { }

  private list = new Subject<string[]>();
  readonly list$ = this.list.asObservable();

  public ob$!: Observable<string>;

  // public gettest(){
  //   this.http.get("http://api.ipify.org/?format=json").subscribe(ip => {
  //     this.ob$ = (ip as any);
  //     this.ob$ = '99999';
  //   });
  //   return this.ob$;
  // }

  getProducts(): Observable<any> {
    // let response = this.http.get("http://api.ipify.org/?format=json").subscribe(ip=>{
    //   return ip;
    // });
    return this.http.get("http://api.ipify.org/?format=json").pipe(
      switchMap(response => {
        return response.toString();
      })
    );
  }



  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  public getIPAddress2() {
    const observable$ = new Observable<string>(observer => {
      this.http.get("http://api.ipify.org/?format=json").subscribe(ip => {
        observer.next(ip as string);
        observer.complete();
        console.log('log 1', ip);
      });
    });
    console.log('log 2', observable$);
    return observable$;
  }

  public getip3(){
    return this.http.get("http://api.ipify.org/?format=json").subscribe(ip =>{return ip;})
  }

  // public getIPAddress3()  
  // {  
  //   let observable$:Observable<any>;
  //   observable$ = this.http.get("http://api.ipify.org/?format=json").subscribe();
  // }  
}  