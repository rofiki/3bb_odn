import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { OdnService } from 'src/app/services/odn/odn.service';

import { firstValueFrom, lastValueFrom, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-odn',
  templateUrl: './detail-odn.component.html',
  styleUrls: ['./detail-odn.component.scss']
})
export class DetailOdnComponent implements OnInit {

  public loginUser: any = null;
  public id:any = this.route.snapshot.paramMap.get('id');
  public itemRef:any = null;

  constructor( 
    private service: OdnService,
    private router: Router,
    private route: ActivatedRoute
    ){}

    ngOnInit(): void {
      const token:any = localStorage.getItem('token');
      this.loginUser = jwtDecode(token);

      this.getData();
    }

    public getData(){
      this.service.findById(this.id).subscribe(r => {
        this.itemRef = r[0];
      });
    }
}
