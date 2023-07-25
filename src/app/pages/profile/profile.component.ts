import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ArmateurService } from '../armateur/armateur.service';
import { AgentParcService } from '../agent-parc/agent-parc.service';
import { environment } from '../../../environments/environment';
import { User } from '../user/user';
import { Armateur } from '../armateur/armateur';
import { AgentParc } from '../agent-parc/agent-parc';
import { NbWindowService } from '@nebular/theme';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nom: string;
  prenom: string;
  addresse: string;
  tel: string;
  email: string;

  id: string;
  role: string;
  userAccount:User;
  armateur: Armateur;
  agent: AgentParc
  isAdmin: boolean = false;
  p:string;
  np: string;
  pp: string;
  constructor(
    private userService: UserService,
    private armateurService: ArmateurService,
    private agentService: AgentParcService,
    private windowService: NbWindowService
  ) { }

  async ngOnInit() {
    this.userAccount = new User();
    this.role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    this.id = localStorage.getItem(environment.CONNECTEDUSER);
    this.userAccount = await this.userService.getById(+this.id);
    if(this.role == environment.ARMATEUR){
      this.armateur = new Armateur();
      this.armateur = await this.armateurService.getArmateurByUserId(+this.id);
      this.nom = this.armateur.nom;
      this.prenom = this.armateur.prenom;
      this.addresse = this.armateur.addresse;
      this.tel = this.armateur.tel;
      this.email = this.armateur.email;

      this.np = this.armateur.nom;
      this.pp = this.armateur.prenom;
      this.p = this.np.substring(0,1) + this.pp.substring(0,1);
      this.p = this.p.toUpperCase();
    }
    if(this.role == environment.AGENT){
      this.agent = new AgentParc();
      this.agent = await this.agentService.getAgentByUserId(+this.id);
      this.nom = this.agent.nom;
      this.prenom = this.agent.prenom;
      this.addresse = this.agent.addresse;
      this.tel = this.agent.tel;
      this.email = this.agent.email;

      this.np = this.agent.nom;
      this.pp = this.agent.prenom;
      this.p = this.np.substring(0,1) + this.pp.substring(0,1);
      this.p = this.p.toUpperCase();
    }
    if(this.role == environment.ADMIN){
      this.isAdmin = true;
      this.p = this.userAccount.pseudo;
      this.p = this.p.substring(0,1).toUpperCase();
    }
  }
  openWindow(){
    this.windowService.open(ModalProfileComponent,{title:"Modifier profile"})
  }
}
