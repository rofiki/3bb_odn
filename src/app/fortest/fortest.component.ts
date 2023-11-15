import { Component, OnInit } from '@angular/core';
import { IpServiceService } from '../services/ip-service.service';

@Component({
  selector: 'app-fortest',
  templateUrl: './fortest.component.html',
  styleUrls: ['./fortest.component.scss']
})
export class FortestComponent implements OnInit {

  constructor(private ip: IpServiceService,){}

  ngOnInit(): void {
    this.ip.getIPAddress2();
    console.log('getip3',this.ip.getip3());
    // console.log('gettest',this.ip.gettest());
  }



}
