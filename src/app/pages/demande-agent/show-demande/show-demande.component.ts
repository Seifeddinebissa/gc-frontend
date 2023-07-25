import { environment } from '../../../../environments/environment';
import { DemandeService } from '../../demande/demande.service';
import { Parc } from '../../parc/parc';
import { ParcService } from '../../parc/parc.service';
import { Demande } from './../../demande/demande';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-show-demande',
  templateUrl: './show-demande.component.html',
  styleUrls: ['./show-demande.component.scss']
})
export class ShowDemandeComponent implements OnInit {

  demande : Demande;
  parc: Parc;
  marquage : string;
  fullNameAgent : string;
  fullNameArmateur : string;
  constructor(
    private demandeService: DemandeService,
    private parcService: ParcService
  ) { }

  async ngOnInit() {
    this.demande = new Demande();
    this.parc = new Parc();
    let idDem = localStorage.getItem('id');
    this.demande = await this.demandeService.getDemandeById(+idDem);
    this.marquage = this.demande.conteneur.marquage;
    if(this.demande.agent!=null){
      this.fullNameAgent = this.demande.agent.nom+' '+this.demande.agent.prenom;
    }else{
      this.fullNameAgent = "Non affecté"
    }
    this.fullNameArmateur = this.demande.arm.nom+' '+this.demande.arm.prenom;
    this.parc = await this.parcService.getById(this.demande.idParcDemande);
  }

}
