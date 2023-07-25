import { ConteneurComponent } from './conteneur/conteneur.component';
import { TypeConteneurComponent } from './type-conteneur/type-conteneur.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TransporteurComponent } from './transporteur/transporteur.component';
import { PagesComponent } from './pages.component';
import { ArmateurComponent } from './armateur/armateur.component';
import { AgentParcComponent } from './agent-parc/agent-parc.component';
import { UserComponent } from './user/user.component';
import { ParcComponent } from './parc/parc.component';
import { TestComponent } from './test/test.component';
import { Page404Component } from './page404/page404.component';
import { AdminGuard } from './login/admin.guard';
import { SessionGuard } from './login/session.guard';
import { DemandeComponent } from './demande/demande.component';
import { DemandeAgentComponent } from './demande-agent/demande-agent.component';
import { TypeDommageComponent } from './type-dommage/type-dommage.component';
import { EirPageCreationComponent } from './eir-page-creation/eir-page-creation.component';
import { ProfileComponent } from './profile/profile.component';
import { ConteneurParcComponent } from './parc/conteneur-parc/conteneur-parc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [SessionGuard],
    children: [
      /*  {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    }, */

      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "armateur",
        component: ArmateurComponent,
        //canActivate :[AdminGuard]
      },
      {
        path: "agentParc",
        component: AgentParcComponent,
      },
      {
        path: "transporteur",
        component: TransporteurComponent,
      },
      {
        path: "typeConteneur",
        component: TypeConteneurComponent,
      },
      {
        path: "parc",
        component: ParcComponent,
      },
      {
        path: "conteneur",
        component: ConteneurComponent,
      },
      {
        path: "user",
        component: UserComponent,
      },
      {
        path: "test",
        component: TestComponent,
      },
      {
        path: "404",
        component: Page404Component,
      },
      {
        path: "demande",
        component: DemandeComponent,
      },
      {
        path: "demandeAgent",
        component: DemandeAgentComponent,
      },
      {
        path: "demandeAgent",
        loadChildren: () =>
          import("./demande-agent/demande-agent.module").then(
            (m) => m.DemandeAgentModule
          ),
      },
      {
        path: "typeDommage",
        component: TypeDommageComponent,
      },
      {
        path : 'eir',
        component : EirPageCreationComponent
      },
      {
        path: "profile",
        component : ProfileComponent
      },
      {
        path: "conteneurParc",
        component: ConteneurParcComponent,
      },
      {
        path: "dashboard",
        component : DashboardComponent
      },
      // {
      //   path: '**',
      //   component: NotFoundComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
