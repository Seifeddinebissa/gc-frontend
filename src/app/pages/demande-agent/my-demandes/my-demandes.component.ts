import { AgentParcService } from './../../agent-parc/agent-parc.service';
import { Component, OnInit, Input } from '@angular/core';
import { DemandeService } from '../../demande/demande.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AgentParc } from '../../agent-parc/agent-parc';
import { NbWindowService } from '@nebular/theme';
import { ShowDemandeComponent } from '../show-demande/show-demande.component';

@Component({
  selector: "ngx-button-eir",
  template:
    '<div class="container-btn"><button nbButton hero status="info" (click)="openEIR()"><nb-icon icon="file-text-outline"></nb-icon></button></div>',
})
export class ButtonViewEIRDemandeAgentMy implements OnInit {
  @Input() value: string;

  ngOnInit() {}
  constructor(
    private router: Router
  ) {}

  openEIR(){
    localStorage.removeItem('idDemande');
    localStorage.setItem('idDemande',this.value);
    this.router.navigate(['/pages/eir'])
  }
}


@Component({
  selector: 'ngx-my-demandes',
  templateUrl: './my-demandes.component.html',
  styleUrls: ['./my-demandes.component.scss']
})
export class MyDemandesComponent implements OnInit {

  settings = {
    noDataMessage: "La table est vide",
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,

      custom: [
        {
          name: "showAction",
          title: '<i class="nb-sunny" title="Show"></i>',
        }
      ],
     },
    columns: {
      conteneur: {
        title: "Marquage",
        type: "string",
        valuePrepareFunction: (data) => {
          return data.marquage;
        },
      },
      etat: {
        title: "Etat",
        type: "string",
        filter: {
          type: "list",
          config: {
            selectText: "Etat",
            list: [
              { value: "Reçue", title: "Reçue" },
              { value: "En cours", title: "En cours" },
              { value: "Traité", title: "Traité" },
            ],
          },
        },
      },
      typeDemande: {
        title: "Type de demande",
        type: "string",
        filter : {
          type :"list",
          config: {
            selectText: "Type",
            list:[
              {value: "Entrée", title: "Entrée"},
              {value: "Sortie", title: "Sortie"}
            ]
          }
        }
      },
      eir: {
        title: "EIR",
        type: "custom",
        renderComponent: ButtonViewEIRDemandeAgentMy,
        valuePrepareFunction: (cell, row) => {
          return row.id;
        },
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width: "11px",
      },
    },
  };

  source: any;
  agent: AgentParc;

  constructor(
    private demandeService : DemandeService,
    private agentService: AgentParcService,
    private windowService: NbWindowService
  ) { }

  async ngOnInit() {
    let idAgent = localStorage.getItem(environment.CONNECTEDUSER);
    this.agent = new AgentParc();
    this.agent = await this.agentService.getAgentByUserId(+idAgent);
    this.source = await this.demandeService.getByAgentParcId(this.agent.id); 
  }

  onCustom(event){
    localStorage.removeItem('id');
    localStorage.setItem('id',event.data.id)
    this.windowService.open(ShowDemandeComponent,{title:"Afficher demande"})
  }

}
