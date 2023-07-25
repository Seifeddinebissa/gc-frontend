import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages.menu';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { environment } from '../../environments/environment';
import { MenuService } from './login/menu.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  role : any;
  menu = MENU_ITEMS;
  public static urlConfig = 'http://localhost:9099/';
  constructor(
    private router : Router,
    private menuService : MenuService
  ){}
  ngOnInit(): void {
    this.role = localStorage.getItem('connectedUserRole');
    console.log(this.role)
    this.menu.forEach(item =>{
      if(this.role === environment.ARMATEUR){
        this.menuService.disableMenuItem(environment.ARMATEUR,environment.ARMATEUR,environment.ARMATEUR,item);
        this.menuService.disableMenuItem(environment.AGENT,environment.AGENT,environment.AGENT,item);
        this.menuService.enableMenuItem(environment.CONTENEURARMATEUR,environment.CONTENEURARMATEUR,environment.CONTENEURARMATEUR,item);
        this.menuService.disableMenuItem(environment.DEMANDEAGENT,environment.DEMANDEAGENT,environment.DEMANDEAGENT,item);
        this.menuService.enableMenuItem(environment.SAUFAGENT,environment.SAUFAGENT,environment.SAUFAGENT,item);
        this.menuService.disableMenuItem(environment.ADMIN,environment.ADMIN,environment.ADMIN,item);
      }
      if(this.role === environment.AGENT){
        this.menuService.disableMenuItem(environment.AGENT,environment.AGENT,environment.AGENT,item);
        this.menuService.enableMenuItem(environment.ARMATEUR,environment.ARMATEUR,environment.ARMATEUR,item);        
        this.menuService.disableMenuItem(environment.CONTENEURARMATEUR,environment.CONTENEURARMATEUR,environment.CONTENEURARMATEUR,item);
        this.menuService.enableMenuItem(environment.DEMANDEAGENT,environment.DEMANDEAGENT,environment.DEMANDEAGENT,item);
        this.menuService.disableMenuItem(environment.SAUFAGENT,environment.SAUFAGENT,environment.SAUFAGENT,item);
        this.menuService.disableMenuItem(environment.ADMIN,environment.ADMIN,environment.ADMIN,item);
      }
      if(this.role === environment.ADMIN){
        this.menuService.enableMenuItem(environment.AGENT,environment.AGENT,environment.AGENT,item);
        this.menuService.enableMenuItem(environment.ARMATEUR,environment.ARMATEUR,environment.ARMATEUR,item);
        this.menuService.enableMenuItem(environment.CONTENEURARMATEUR,environment.CONTENEURARMATEUR,environment.CONTENEURARMATEUR,item);
        this.menuService.disableMenuItem(environment.DEMANDEAGENT,environment.DEMANDEAGENT,environment.DEMANDEAGENT,item);
        this.menuService.enableMenuItem(environment.SAUFAGENT,environment.SAUFAGENT,environment.SAUFAGENT,item);
        this.menuService.enableMenuItem(environment.ADMIN,environment.ADMIN,environment.ADMIN,item);
      }
    })
  }

  
}
