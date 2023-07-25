import { TransporteurService } from './../transporteur.service';
import { Component, OnInit } from '@angular/core';
import { Transporteur } from '../transporteur';

@Component({
  selector: 'ngx-show-transporteur',
  templateUrl: './show-transporteur.component.html',
  styleUrls: ['./show-transporteur.component.scss']
})
export class ShowTransporteurComponent implements OnInit {

  transporteur : Transporteur;

  constructor(
    private transporteurService : TransporteurService
    ) { }

  async ngOnInit() {
    this.transporteur = new Transporteur();
    let id = localStorage.getItem('id');
    this.transporteur = await this.transporteurService.getById(Number(id));
  }


}
