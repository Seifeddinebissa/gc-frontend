import { EmailContent } from './../../armateur/email-content';
import { ArmateurService } from '../../armateur/armateur.service';
import { Armateur } from './../../armateur/armateur';
import { Component, OnInit } from '@angular/core';
import { AgentParcService } from '../../agent-parc/agent-parc.service';
import { AgentParc } from '../../agent-parc/agent-parc';
import { NbToastrService, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-modal-mdp',
  templateUrl: './modal-mdp.component.html',
  styleUrls: ['./modal-mdp.component.scss']
})
export class ModalMDPComponent implements OnInit {

  value: string;
  msg:string;
  mailContent:EmailContent;
  armateur: Armateur;
  agent: AgentParc;
  constructor(
    private armateurService : ArmateurService,
    private agentService: AgentParcService,
    private toastService: NbToastrService,
    private windowRef:NbWindowRef
  ) { }

  ngOnInit(): void {
  }

  async send(){
    this.agent = await this.agentService.getByEmail(this.value);
    this.armateur = await this.armateurService.getByEmail(this.value);
    if(!!this.agent){
      this.mailContent = new EmailContent(this.value,this.agent.user.pseudo,this.agent.user.mdp);
      this.agentService.envoyerEmail(this.mailContent).subscribe(res => {
        if (res == true) {
          this.toastService.info("INFO", "Email envoyé avec succès");
        }
        if (res == false) {
          this.toastService.danger("Echec", "Echec d'envoi d'email");
        }
      });
      this.msg = "Nous avons envoyé un mail contient votre pseudo et mot de passe.";
    }else if(!!this.armateur){
      this.mailContent = new EmailContent(this.value,this.armateur.user.pseudo,this.armateur.user.mdp);
      this.armateurService.envoyerEmail(this.mailContent).subscribe(res => {
        if (res == true) {
          this.toastService.info("INFO", "Email envoyé avec succès");
        }
        if (res == false) {
          this.toastService.danger("Echec", "Echec d'envoi d'email");
        }
      });
      this.msg = "Nous avons envoyé un mail contient votre pseudo et mot de passe.";
    }else{
      this.toastService.danger('Alert',"Email invalide il faut le changer");
    }
    
  }
  fermer(){
    this.windowRef.close();
  }
}
