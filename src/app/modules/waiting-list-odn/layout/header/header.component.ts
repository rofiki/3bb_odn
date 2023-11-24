import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';

import { jwtDecode } from 'jwt-decode';
import { AppService } from 'src/app/services/base/app.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgFor, NgIf, RouterLink, Bootstrap5Module]
})
export class HeaderComponent implements OnInit {

  constructor(private elementRef: ElementRef,private appService: AppService,) { }

  public loginUser: any = null;
  public BASE_URL:string = this.appService.BASE_URL;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

  ngAfterViewInit() {
    const bodyStyle = this.elementRef.nativeElement.ownerDocument.body.style;
    bodyStyle.background = 'url(' + this.BASE_URL +'assets/wallpaper/wallpaper_or1.jpg)';
  }

}