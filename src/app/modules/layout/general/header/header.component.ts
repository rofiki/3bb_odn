import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';

@Component({
  standalone: true,
  selector: 'app-general-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgFor, NgIf, RouterLink, Bootstrap5Module]
})
export class HeaderGeneralComponent {

}
