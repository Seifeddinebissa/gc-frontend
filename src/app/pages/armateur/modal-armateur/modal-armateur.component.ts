import { ArmateurComponent } from './../armateur.component';
import { ArmateurService } from './../armateur.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Armateur } from '../armateur';
import { Router } from '@angular/router';
import { EmailContent } from '../email-content';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';

@Component({
  selector: 'ngx-modal-armateur',
  templateUrl: './modal-armateur.component.html',
  styleUrls: ['./modal-armateur.component.scss']
})
export class ModalArmateurComponent implements OnInit {

  armateur : Armateur;
  T : string;
  mailContent : EmailContent;
  user: User;
  editingUser: boolean;

  constructor(private windowRef : NbWindowRef,
              private armateurService : ArmateurService, 
              private toastService : NbToastrService,
              private router : Router,
              private userService: UserService
              ) { }

  async ngOnInit() {
    this.user = new User()
    this.armateur = new Armateur();
    this.editingUser = true;
    let e = localStorage.getItem('e');
    if(e === '0')
      this.T = "Ajouter";
    if(e === '1'){
      this.T = "Modifier";
      let id  = localStorage.getItem('id');
      this.armateur = await this.armateurService.getById(Number(id));
      this.user = await this.userService.getById(this.armateur.user.id);
    }
  }

  fermer(){
    this.windowRef.close();
  }

  async onSave(){
    let e = localStorage.getItem('e');
    console.log(this.mailContent);
    if (e === '0') {
      this.user.role = "Armateur"
      this.user.blocked = false
      if (!!await this.userService.getByPseudo(this.user.pseudo)) {
        this.toastService.danger("Alert", "Pseudo invalide il faut le changer")
        this.editingUser = false
      }
      else if (!!this.user.pseudo && !!this.user.mdp) {
        this.userService.addUser(this.user)
        await this.delay(500)
        this.user = await this.userService.getByPseudo(this.user.pseudo)
        this.armateurService.addArmateur(this.armateur, this.user.id);
        this.mailContent = new EmailContent(this.armateur.email, this.user.mdp, this.user.pseudo);
        this.armateurService.envoyerEmail(this.mailContent).subscribe(res => {
          if (res == true) {
            this.toastService.info("INFO", "Email envoyé avec succès");
          }
          if (res == false) {
            this.toastService.danger("Echec", "Echec d'envoi d'email");
          }
        });
        localStorage.removeItem('e');
        this.windowRef.close();
        this.router.navigateByUrl('/').then(() => {
          this.router.navigate(['/pages/armateur']);
        });
        this.toastService.success("Succès", "Armateur ajouté avec succés");
      }
    }
    if (e === "1") {
      console.log(this.armateur);
      this.userService.editUser(this.user);
      this.armateurService.editArmateur(this.armateur, this.user.id);
      this.mailContent = new EmailContent(this.armateur.email, this.user.mdp, this.user.pseudo);
      this.armateurService.envoyerEmail(this.mailContent).subscribe(res => {
        if (res == true) {
          this.toastService.info("INFO", "Email envoyé avec succès");
        }
        if (res == false) {
          this.toastService.danger("Echec", "Echec d'envoi d'email");
        }
      });
      localStorage.removeItem("e");
      localStorage.removeItem("id");
      this.toastService.success("Succès", "Armateur modifié");
      this.windowRef.close();
      this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/armateur"]);
      });
    }
  }

  genererPseudoMdp(){
    if(this.armateur.nom!=undefined&&this.armateur.prenom!=undefined&&this.armateur.tel!=undefined&&this.armateur.email!=undefined){
    this.user.pseudo = this.armateur.nom.substring(0,3) +"."+ this.armateur.prenom.substring(this.armateur.prenom.length-3,this.armateur.prenom.length) + this.armateur.tel.substring(2,3);
    this.user.mdp = this.armateur.nom.substring(0,3).toUpperCase()+this.armateur.prenom.substring(0,3)+this.armateur.tel.substring(3,6)+this.armateur.email.substring(1,4);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
