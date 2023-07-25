import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user : User;
  isLoggedIn : boolean = false;
  constructor(private userService : UserService, private router : Router) { 
    this.user = new User;
  }

  async login(user : User){
    this.user = await this.userService.getByPseudo(user.pseudo);
    if (this.user != null) {
      if (this.user.blocked == false) {
        if (this.user.mdp === user.mdp) {
          this.isLoggedIn = true;
          localStorage.setItem("isLoggetIn", String(this.isLoggedIn));
          return this.user.id;
        } else {
          return -1;
        }
      }else{
        return -3
      }
    } else {
      return -2;
    }
  }

  isAdmin() : boolean{
    if(this.isLoggedIn)
      if(this.user.role === environment.ADMIN){
        return true;
      }else{
        return false;
      }
  }
  isAgent() : boolean{
    if(this.isLoggedIn)
      if(this.user.role === environment.AGENT){
        return true;
      }else{
        return false;
      }
  }
  isArmateur() : boolean{
    if(this.isLoggedIn)
      if(this.user.role === environment.ARMATEUR){
        return true;
      }else{
        return false;
      }
  }

  logout(){
    this.isLoggedIn = false;
    localStorage.setItem('isLoggetIn',String(this.isLoggedIn));
    this.user = undefined;
    localStorage.removeItem('connectedUserId');
    localStorage.removeItem('connectedUserRole');
    this.router.navigate(['/auth'])
  }
}
