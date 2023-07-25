import { NgSelectModule } from '@ng-select/ng-select';
import { ColorViewComponent, ConteneurComponent } from './conteneur/conteneur.component';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule, NbTabsetModule, NbRouteTabsetModule, NbSelectModule, NbIconModule, NbButtonGroupModule, NbRadioModule, NbCheckboxModule, NbInputModule, NbListModule, NbFormFieldModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ArmateurComponent } from './armateur/armateur.component';
import { ModalArmateurComponent } from './armateur/modal-armateur/modal-armateur.component';
import { ShowArmateurComponent } from './armateur/show-armateur/show-armateur.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ButtonModule } from 'primeng/button';
import { AgentParcComponent } from './agent-parc/agent-parc.component';

import { ShowAgentComponent } from './agent-parc/show-agent/show-agent.component';
import { ModalAgentComponent } from './agent-parc/modal-agent/modal-agent.component';
import { ButtonViewParcConteneur, ParcComponent } from './parc/parc.component';
import { ModalParcComponent } from './parc/modal-parc/modal-parc.component';
import { TypeConteneurComponent } from './type-conteneur/type-conteneur.component';
import { ModalTypeConteneurComponent } from './type-conteneur/modal-type-conteneur/modal-type-conteneur.component';
import { ModalConteneurComponent } from './conteneur/modal-conteneur/modal-conteneur.component';
import { UserComponent } from './user/user.component';
import { TransporteurComponent } from './transporteur/transporteur.component';
import { ShowTransporteurComponent } from './transporteur/show-transporteur/show-transporteur.component';
import { ModalTransporterComponent } from './transporteur/modal-transporter/modal-transporter.component';
import { TestComponent } from './test/test.component';
import { ShowPdfComponent } from './test/show-pdf/show-pdf.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { TypeDommageComponent } from './type-dommage/type-dommage.component';
import { ModalTypeDommageComponent } from './type-dommage/modal-type-dommage/modal-type-dommage.component';
import { ButtonViewEIRDemandeArmateur, DemandeComponent } from './demande/demande.component';
import { ModalDemandeComponent } from './demande/modal-demande/modal-demande.component';
import { ShowDemandeComponent } from './demande/show-demande/show-demande.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ModalDommageItemComponent } from './eir-page-creation/modal-dommage-item/modal-dommage-item.component';
import { EirPageCreationComponent } from './eir-page-creation/eir-page-creation.component';
import { WebcamModule } from 'ngx-webcam';
import { ProfileComponent } from './profile/profile.component';
import { ModalProfileComponent } from './profile/modal-profile/modal-profile.component';
import { ShowDommageItemComponent } from './eir-page-creation/show-dommage-item/show-dommage-item.component';
import { ShowEirPdfComponent } from './eir-page-creation/show-eir-pdf/show-eir-pdf.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConteneurParcComponent } from './parc/conteneur-parc/conteneur-parc.component';
import { EchartsPieEtatComponent } from './dashboard/echarts-pie-etat.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsPieConteneurComponent } from './dashboard/echarts-pie-conteneur.component';
import { ArmateurActiviteComponent } from './dashboard/armateur-activite.component';
import { AgentActiviteComponent } from './dashboard/agent-activite.component';
import { ShowConteneurComponent } from './conteneur/show-conteneur/show-conteneur.component';
import { ModalMDPComponent } from './login/modal-mdp/modal-mdp.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
    ConfirmDialogModule,
    ButtonModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NgSelectModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonGroupModule,
    NbRadioModule,
    NbCheckboxModule,
    NbInputModule,
    WebcamModule,
    NbListModule,
    NbFormFieldModule,
    NgxEchartsModule,
    NbSelectModule
    ],
  declarations: [
    PagesComponent,
    ArmateurComponent,
    ModalArmateurComponent,
    ShowArmateurComponent,
    AgentParcComponent,
    ModalAgentComponent,
    ShowAgentComponent,
    ParcComponent,
    ModalParcComponent,
    TypeConteneurComponent,
    ModalTypeConteneurComponent,
    ModalConteneurComponent,
    ConteneurComponent,
    ColorViewComponent,
    UserComponent,
    TransporteurComponent,
    ModalTransporterComponent,
    ShowTransporteurComponent,
    TestComponent,
    ShowPdfComponent,
    LoginComponent,
    Page404Component,
    TypeDommageComponent,
    ModalTypeDommageComponent,
    DemandeComponent,
    ModalDemandeComponent,
    ShowDemandeComponent,
    ButtonViewEIRDemandeArmateur,
    EirPageCreationComponent,
    ModalDommageItemComponent,
    ProfileComponent,
    ModalProfileComponent,
    ShowDommageItemComponent,
    ShowEirPdfComponent,
    DashboardComponent,    
    ConteneurParcComponent,
    ButtonViewParcConteneur,
    EchartsPieEtatComponent,
    EchartsPieConteneurComponent,
    ArmateurActiviteComponent,
    AgentActiviteComponent,
    ShowConteneurComponent,
    ModalMDPComponent,
  ],
  exports: [
    NbSelectModule
  ]
})
export class PagesModule {
}
