import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeAgentComponent } from './demande-agent.component';
import { AllDemandesComponent, ButtonAffectation, ButtonViewEIRDemandeAgentAll } from './all-demandes/all-demandes.component';
import { MyDemandesComponent, ButtonViewEIRDemandeAgentMy } from './my-demandes/my-demandes.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { DemandeAgentRoutingModule } from './demande-agent-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { ShowDemandeComponent } from './show-demande/show-demande.component';


@NgModule({
  imports: [
    CommonModule,
    DemandeAgentRoutingModule,
    ThemeModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    ConfirmDialogModule,
    ButtonModule,
    NgSelectModule,
    NbButtonGroupModule,
    NbIconModule,
    NbEvaIconsModule,
    NbTooltipModule
  ],
  declarations: [
    DemandeAgentComponent,
    AllDemandesComponent,
    MyDemandesComponent,
    ButtonViewEIRDemandeAgentAll,
    ButtonViewEIRDemandeAgentMy,
    ButtonAffectation,
    ShowDemandeComponent,
  ],
})
export class DemandeAgentModule { }
