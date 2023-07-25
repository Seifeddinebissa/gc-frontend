import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeAgentComponent } from './demande-agent.component';
import { AllDemandesComponent } from './all-demandes/all-demandes.component';
import { MyDemandesComponent } from './my-demandes/my-demandes.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DemandeAgentComponent,
    children: [
      { path: 'myDemandes', component: MyDemandesComponent },
      { path: 'allDemandes', component: AllDemandesComponent },
      
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DemandeAgentRoutingModule { }
