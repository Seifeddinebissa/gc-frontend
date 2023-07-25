import { Component, OnInit } from '@angular/core';
import { AgentParc } from '../agent-parc';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { AgentParcService } from '../agent-parc.service';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { environment } from '../../../../environments/environment';
import { EmailContent } from '../../armateur/email-content';

@Component({
  selector: 'ngx-modal-agent',
  templateUrl: './modal-agent.component.html',
  styleUrls: ['./modal-agent.component.scss']
})
export class ModalAgentComponent implements OnInit {
  agentParc : AgentParc;
  user: User;
  T : string;
  mailContent: EmailContent;

  constructor(
    private windowRef : NbWindowRef,
              private agentParcService : AgentParcService, 
              private toastService : NbToastrService,
              private router : Router,
              private userService: UserService
  ) { }

 async ngOnInit() {
  this.agentParc = new AgentParc();
  this.user = new User();
    let e = localStorage.getItem('e');
    if(e === '0')
    this.T = "Ajouter";
    if(e === '1'){
      this.T = "Modifier";
      let id  = localStorage.getItem('id');
      this.agentParc = await this.agentParcService.getById(Number(id));
      this.user = await this.userService.getById(this.agentParc.user.id);
      console.log(this.agentParc);
    }
  }

  fermer(){
    this.windowRef.close();
  }

  async onSave(){
    let e = localStorage.getItem('e');
    if(e === '0'){
      this.user.role = environment.AGENT;
      this.user.blocked =false;
      if(!!await this.userService.getByPseudo(this.user.pseudo)){
        this.toastService.danger("Alert","Pseudo invalide il faut le changer!");
      }else if(!!this.user.pseudo && !!this.user.mdp){
        this.userService.addUser(this.user);
        await this.delay(500);
        this.user = await this.userService.getByPseudo(this.user.pseudo);
        this.agentParcService.addAgentParc(this.agentParc,this.user.id);
        this.mailContent = new EmailContent(this.agentParc.email,this.user.pseudo,this.user.mdp);
        this.agentParcService.envoyerEmail(this.mailContent).subscribe(res =>{
          if (res == true) {
            this.toastService.info("INFO", "Email envoyé avec succès");
          }
          if (res == false) {
            this.toastService.danger("Echec", "Echec d'envoi d'email");
          }
        });
      }
      localStorage.removeItem('e');
      this.windowRef.close();
      this.router.navigateByUrl('/',).then(()=>{
         this.router.navigate(['/pages/agentParc']);
       });
      this.toastService.success("Succès","Agent de parc ajouté avec succés");
    }
    if (e === "1") {
      console.log(this.agentParc);
      this.userService.editUser(this.user);
      this.agentParcService.editAgentParc(this.agentParc,this.user.id);
      this.mailContent = new EmailContent(this.agentParc.email,this.user.pseudo,this.user.mdp);
        this.agentParcService.envoyerEmail(this.mailContent).subscribe(res =>{
          if (res == true) {
            this.toastService.info("INFO", "Email envoyé avec succès");
          }
          if (res == false) {
            this.toastService.danger("Echec", "Echec d'envoi d'email");
          }
        });
      localStorage.removeItem("e");
      localStorage.removeItem("id");
      this.toastService.success("Succès", "AgentParc modifié");
      this.windowRef.close();
      this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/agentParc"]);
      });
    }
  }

  genererPseudoMdp(){
    if(!!this.agentParc.nom&&!!this.agentParc.prenom&&!!this.agentParc.tel&&!!this.agentParc.email){
    this.user.pseudo = this.agentParc.nom.substring(0,3) +"."+ this.agentParc.prenom.substring(this.agentParc.prenom.length-3,this.agentParc.prenom.length) + this.agentParc.tel.substring(2,3);
    this.user.mdp = this.agentParc.nom.substring(0,3).toUpperCase()+this.agentParc.prenom.substring(0,3)+this.agentParc.tel.substring(3,6)+this.agentParc.email.substring(1,4);
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
