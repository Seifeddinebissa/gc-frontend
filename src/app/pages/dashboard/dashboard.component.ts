import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isArmateur: boolean = false;
  constructor() { }

  ngOnInit(): void {
    let role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    if(role == environment.ARMATEUR){
      this.isArmateur = true;
    }
  }

}
