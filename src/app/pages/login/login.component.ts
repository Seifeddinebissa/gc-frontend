import { NbToastrService, NbWindowService } from '@nebular/theme';
import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ModalMDPComponent } from './modal-mdp/modal-mdp.component';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user : User;
  connectedUserId : number;
  showPassword = false;

  constructor(
    //private userService : UserService,
    private toastService : NbToastrService ,
    private router : Router,
    private loginService : LoginService,
    private userService : UserService,
    private windowService: NbWindowService
    ) { }

  ngOnInit(): void {
    this.user = new User;
  }

    async connecter(){
    this.connectedUserId = await this.loginService.login(this.user);
    if(this.connectedUserId == -1){
      this.toastService.danger("Erreur","Mot de passe incorrect!");
    }else if(this.connectedUserId == -2){
      this.toastService.warning("Avertissement","Utilisateur non trouvé!");
    }else if(this.connectedUserId == -3){
      this.toastService.warning("Avertissement","Votre compte est bloqué!")
    }else{
      localStorage.removeItem('connectedUserId');
      localStorage.removeItem('connectedUserRole');
      localStorage.setItem('connectedUserId',String(this.connectedUserId));
      let u = await this.userService.getById(this.connectedUserId);
      localStorage.setItem('connectedUserRole',u.role);
      this.router.navigate(['/pages']);
    }
  }
  onClick(){
    this.windowService.open(ModalMDPComponent,{title:'Envoyer Mot de passe'})
  }
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
