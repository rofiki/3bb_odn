import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bootstrap5Module } from 'src/app/modules/bootstrap5/bootstrap5.module';

@Component({
  standalone: true,
  selector: 'app-general-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [NgFor, NgIf, RouterLink, Bootstrap5Module]
})
export class FooterGeneralComponent {

}
