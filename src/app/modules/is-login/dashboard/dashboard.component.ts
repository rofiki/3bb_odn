import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef,) { }

  public loginUser: any = null;


  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
    window.location.href = this.loginUser.email + '/odn';
  }

  // ngAfterViewInit() {
  //   const bodyStyle = this.elementRef.nativeElement.ownerDocument.body.style;
  //   bodyStyle.background = 'url(/assets/wallpaper/wallpaper_or1.jpg)';
  // }
}
