import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { AgentParcService } from './agent-parc.service';
import { ModalAgentComponent } from './modal-agent/modal-agent.component';
import { ShowAgentComponent } from './show-agent/show-agent.component';

@Component({
  selector: 'ngx-agent-parc',
  templateUrl: './agent-parc.component.html',
  styleUrls: ['./agent-parc.component.scss'],
  providers: [ConfirmationService],
})
export class AgentParcComponent implements OnInit {
  settings = {
    noDataMessage : "La table est vide",
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: true,

      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: "editAction",
          title: '<i class="nb-edit" title="Edit"></i>',
        },
      ],
    },
    columns: {
      nom: {
        title: "Nom",
        type: "string",
      },
      prenom: {
        title: "Prénom",
        type: "string",
      },
    },
  };

  source: any;
  constructor(
    private agentParcService: AgentParcService,
    private toastService: NbToastrService,
    private windowService: NbWindowService,
    private confirmationService: ConfirmationService,
    private router :Router,
  ) {}



  async ngOnInit(){
    this.source = await this.agentParcService.getAll();
  }
  openWindow() {
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e", "0");
    this.windowService.open(ModalAgentComponent, { title: "Ajouter" });
  }

  onCustom(event){
    if(event.action === 'editAction'){
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('e', '1');
      localStorage.setItem('id',event.data.id)
      this.windowService.open(ModalAgentComponent,{title : 'Modifier agent de parc'})
    }
    
    if(event.action === 'showAction'){
      localStorage.removeItem('id');
      localStorage.setItem('id',event.data.id);
      this.windowService.open(ShowAgentComponent,{title : 'Afficher agent de parc'})
    }
}

async confirmDelete(event) {
  this.confirmationService.confirm({
    message: "voulez-vous supprimer cet enregistrement ?",
    header: "Confirmation de suppression",
    icon: "pi pi-info-circle",
    acceptButtonStyleClass: "p-button-rounded p-button-success",
    rejectButtonStyleClass: "p-button-rounded p-button-danger",
    acceptLabel: "Oui",
    rejectLabel: "Non",
    accept: () => {
      this.agentParcService.deleteAgentParc(event.data.id);
      this.toastService.warning("Succés", "Agent de parc supprimé");
      this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/agentParc"]);
      });
    },
  });
}
}
