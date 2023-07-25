import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Armateur } from '../../armateur/armateur';
import { AgentParc } from '../../agent-parc/agent-parc';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { AgentParcService } from '../../agent-parc/agent-parc.service';
import { ArmateurService } from '../../armateur/armateur.service';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { EmailContent } from '../../armateur/email-content';

@Component({
  selector: 'ngx-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss']
})
export class ModalProfileComponent implements OnInit {
  no: string;
  pr: string;
  ad: string;
  te: string;
  em: string;
  isAdmin: boolean = false;
  showPassword = true;

  userAccount: User
  role: string;
  armateur: Armateur
  agent: AgentParc
  mailContent: EmailContent
  constructor(
    private windowRef: NbWindowRef,
    private agentService: AgentParcService,
    private armateurService: ArmateurService,
    private userService: UserService,
    private toastService: NbToastrService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.userAccount = new User();
    this.role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    let id = localStorage.getItem(environment.CONNECTEDUSER);
    this.userAccount = await this.userService.getById(+id);
    if(this.role == environment.ARMATEUR){
      this.armateur = new Armateur();
      this.armateur = await this.armateurService.getArmateurByUserId(+id);
      this.no = this.armateur.nom;
      this.pr = this.armateur.prenom;
      this.ad = this.armateur.addresse;
      this.te = this.armateur.tel;
      this.em = this.armateur.email;
    }
    if(this.role == environment.AGENT){
      this.agent = new AgentParc();
      this.agent = await this.agentService.getAgentByUserId(+id);
      this.no = this.agent.nom;
      this.pr = this.agent.prenom;
      this.ad = this.agent.addresse;
      this.te = this.agent.tel;
      this.em = this.agent.email;
    }
    if(this.role == environment.ADMIN){
      this.isAdmin = true;
    }
  }

  onSave(){
    this.userService.editUser(this.userAccount);    
    if(this.role == environment.ARMATEUR){
      this.armateur.nom = this.no;
      this.armateur.prenom = this.pr;
      this.armateur.addresse = this.ad;
      this.armateur.tel = this.te;
      this.armateur.email = this.em;
      this.armateurService.editArmateur(this.armateur,this.userAccount.id);
      this.mailContent = new EmailContent(this.armateur.email,this.userAccount.pseudo,this.userAccount.mdp);
      this.armateurService.envoyerEmail(this.mailContent).subscribe(res =>{
        if (res == true) {
          this.toastService.info("INFO", "Email envoyé avec votre nouveau pseudo et mot de passe!");
        }
        if (res == false) {
          this.toastService.danger("Echec", "Echec d'envoi d'email");
        }
      });
    }
    if(this.role == environment.AGENT){
      this.agent.nom = this.no;
      this.agent.prenom = this.pr;
      this.agent.addresse = this.ad;
      this.agent.tel = this.te;
      this.agent.email = this.em;
      this.agentService.editAgentParc(this.agent,this.userAccount.id);
      this.mailContent = new EmailContent(this.agent.email,this.userAccount.pseudo,this.userAccount.mdp);
      this.armateurService.envoyerEmail(this.mailContent).subscribe(res =>{
        if (res == true) {
          this.toastService.info("INFO", "Email envoyé avec votre nouveau pseudo et mot de passe!");
        }
        if (res == false) {
          this.toastService.danger("Echec", "Echec d'envoi d'email");
        }
      });
    }
    if(this.role == environment.ADMIN){
      //this.userService.editUser(this.userAccount);
    }
    this.toastService.success("Succès","Votre profile est mis à jour avec succès");
    this.windowRef.close();
    this.router.navigateByUrl('/',{skipLocationChange: true}).then(() =>{
      this.router.navigate(['/pages/profile']);
    })
  }

  fermer(){
    this.windowRef.close();
  }

  
}
