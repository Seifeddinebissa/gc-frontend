import { ArmateurService } from './../armateur.service';
import { Component, OnInit } from '@angular/core';
import { Armateur } from '../armateur';
import { environment } from '../../../../environments/environment';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'ngx-show-armateur',
  templateUrl: './show-armateur.component.html',
  styleUrls: ['./show-armateur.component.scss']
})
export class ShowArmateurComponent implements OnInit {

  armateur : Armateur;
  isAgent : boolean;
  user: User;

  constructor(
    private armateurService : ArmateurService
    ) { }

  async ngOnInit() {
    let role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    this.isAgent = !(role == "Agent");
    this.armateur = new Armateur();
    this.user = new User()
    let id = localStorage.getItem('id');
    this.armateur = await this.armateurService.getById(Number(id));
    this.user = this.armateur.user;
  }
}
