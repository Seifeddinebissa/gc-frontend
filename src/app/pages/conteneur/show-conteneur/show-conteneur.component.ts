import { TypeConteneur } from './../../type-conteneur/type-conteneur';
import { Armateur } from './../../armateur/armateur';
import { Component, OnInit } from '@angular/core';
import { ConteneurService } from '../conteneur.service';
import { Conteneur } from '../conteneur';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-show-conteneur',
  templateUrl: './show-conteneur.component.html',
  styleUrls: ['./show-conteneur.component.scss']
})
export class ShowConteneurComponent implements OnInit {

  conteneur: Conteneur;
  armateur : Armateur;
  typeConteneur : TypeConteneur;
  isArmateur: boolean = false;

  constructor(
    private conteneurService : ConteneurService
  ) { }

  async ngOnInit() {
    let role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    if(role == environment.ARMATEUR)
      this.isArmateur = true;
    this.conteneur = new Conteneur();
    this.armateur = new Armateur();
    this.typeConteneur = new TypeConteneur();
    let idCtr = localStorage.getItem('id');
    this.conteneur = await this.conteneurService.getConteneurById(+idCtr);
    this.typeConteneur = this.conteneur.conteneurType;
    this.armateur = this.conteneur.armateur;
  }

}
