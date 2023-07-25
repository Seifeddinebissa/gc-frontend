import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande.service';
import { Demande } from './../demande';
import { environment } from '../../../../environments/environment';
import { ParcService } from '../../parc/parc.service';
import { Parc } from '../../parc/parc';

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
  isArm : boolean = false;
  constructor(
    private demandeService : DemandeService,
    private parcService: ParcService
  ) {}

  async ngOnInit() {
    this.demande = new Demande();
    this.parc = new Parc();
    let id = localStorage.getItem('id');
    this.demande = await this.demandeService.getDemandeById(+id);
    this.marquage = this.demande.conteneur.marquage;
    if(this.demande.agent!=null){
      this.fullNameAgent = this.demande.agent.nom+' '+this.demande.agent.prenom;
    }else{
      this.fullNameAgent = "Non affecté"
    }
    this.fullNameArmateur = this.demande.arm.nom+' '+this.demande.arm.prenom;
    this.parc = await this.parcService.getById(this.demande.idParcDemande);
    let role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    if(role === environment.ARMATEUR)
      this.isArm = true;
  }


}
