import { title } from 'process';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../../pages/user/user';
import { LoginService } from '../../../pages/login/login.service';
import { UserService } from '../../../pages/user/user.service';
import { ArmateurService } from '../../../pages/armateur/armateur.service';
import { AgentParcService } from '../../../pages/agent-parc/agent-parc.service';
import { Router } from '@angular/router';

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  connectedUser: User;
  name: string;
  title: string;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
  ];

  currentTheme = "default";

  userMenu = [{ title: "Profile" }, { title: "Log out" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    //private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private nbMenuService: NbMenuService,
    private loginService: LoginService,
    private userService: UserService,
    private armateurService: ArmateurService,
    private agentService: AgentParcService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.connectedUser = new User();
    let id = localStorage.getItem("connectedUserId");

    this.connectedUser = await this.userService.getById(+id);
    if (this.connectedUser.role === "Admin") {
      this.name = this.connectedUser.pseudo;
      this.title = this.connectedUser.pseudo;
    }
    if (this.connectedUser.role === "Armateur") {
      this.user = await this.armateurService.getArmateurByUserId(+id);
      this.name = this.user.nom + " " + this.user.prenom;
      this.title = this.connectedUser.pseudo;
    }
    if (this.connectedUser.role === "Agent") {
      this.user = await this.agentService.getAgentByUserId(+id);
      this.name = this.user.nom + " " + this.user.prenom;
      this.title = this.connectedUser.pseudo;
    }

    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "my-context-menu"),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === "Log out") {
          this.loginService.logout();
        }
        if (title === "Profile") {
          this.router.navigate(['pages/profile']);
        }
      });
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
