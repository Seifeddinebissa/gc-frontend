import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-demande-agent',
  templateUrl: './demande-agent.component.html',
  styleUrls: ['./demande-agent.component.scss'],
})
export class DemandeAgentComponent implements OnInit {

  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  changeButton(event){
    if(event[0] == 'all'){
      this.router.navigate(['pages/demandeAgent/allDemandes'])
    }
    if(event[0] == 'my'){
      this.router.navigate(['pages/demandeAgent/myDemandes'])
    }
  }
}