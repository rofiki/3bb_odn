import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';

import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgFor, NgIf, RouterLink, Bootstrap5Module]
})
export class HeaderComponent implements OnInit {

  constructor(private elementRef: ElementRef,) { }

  public loginUser: any = null;

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
    this.loginUser = jwtDecode(token);
  }

  ngAfterViewInit() {
    const bodyStyle = this.elementRef.nativeElement.ownerDocument.body.style;
    bodyStyle.background = 'url(/assets/wallpaper/wallpaper_or1.jpg)';
  }

}