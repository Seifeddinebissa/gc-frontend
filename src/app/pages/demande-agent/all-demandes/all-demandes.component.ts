import { EirService } from './../../eir-page-creation/eir.service';
import { AgentParc } from './../../agent-parc/agent-parc';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DemandeService } from '../../demande/demande.service';
import { environment } from '../../../../environments/environment';
import { AgentParcService } from '../../agent-parc/agent-parc.service';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ShowDemandeComponent } from '../show-demande/show-demande.component';
import { Eir } from '../../eir-page-creation/eir';
import { ShowEirPdfComponent } from '../../eir-page-creation/show-eir-pdf/show-eir-pdf.component';
import { Router } from '@angular/router';

@Component({
  selector: "ngx-button-eir",
  template:
    '<div class="container-btn"><button nbButton hero status="info" [disabled]="value" (click)="openEir()"><nb-icon icon="file-text-outline"></nb-icon></button></div>',
})
export class ButtonViewEIRDemandeAgentAll implements OnInit {
  @Input() value: string;
  @Input() rowData:any;
  eir:Eir;

  constructor(
    private eirService: EirService,
    private windowService: NbWindowService
  ) {}
  ngOnInit() {}
  
  async openEir(){
    this.eir = await this.eirService.getByDemandeId(this.rowData.id);
    localStorage.setItem('id',this.eir.id.toString());
    this.windowService.open(ShowEirPdfComponent,{title: "Afficher EIR"});
  }
}

@Component({
  selector: "ngx-button-affectation",
  template:
    '<div class="container-btn"><button nbButton nbTooltipStatus="control"  hero status="success" [disabled]="value" (click)="getData()"><nb-icon icon="corner-down-left-outline"></nb-icon></button></div>',
  styles: [
    `
      .container-btn {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class ButtonAffectation implements OnInit {

  @Input() value: boolean;
  @Input() rowData: any;
  @Output() rowDataClicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {  
  }
  constructor() {}
  getData() {
    this.rowDataClicked.emit(this.rowData);
  }
}

@Component({
  selector: 'ngx-all-demandes',
  templateUrl: './all-demandes.component.html',
  styleUrls: ['./all-demandes.component.scss']
})
export class AllDemandesComponent implements OnInit {

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
      affectation: {
        title: "Affectation",
        type: "custom",
        renderComponent: ButtonAffectation,
        valuePrepareFunction: (cell,row) =>{
          return !(row.agent == null);
        },
        onComponentInitFunction: (instance) => {
          instance.rowDataClicked.subscribe((rowData) => {
            this.affecter(rowData);
          });
        },
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width: "11px"
      },
      eir: {
        title: "EIR",
        type: "custom",
        renderComponent: ButtonViewEIRDemandeAgentAll,
        valuePrepareFunction: (cell,row) => {
          return !(row.etat == "Traité")
        },
        onComponentInitFunction: () => {
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
  transporteur: number = -1;

  constructor(
    private demandeService : DemandeService,
    private agentService: AgentParcService,
    private toastService: NbToastrService,
    private windowService: NbWindowService,
    private router: Router
  ) {}

  async ngOnInit(){
    this.source = await this.demandeService.getAll();
    this.agent = new AgentParc();
    let idAg = localStorage.getItem(environment.CONNECTEDUSER);
    this.agent = await this.agentService.getAgentByUserId(+idAg);
  }

  onCustom(event){
    localStorage.removeItem('id');
    localStorage.setItem('id',event.data.id);
    this.windowService.open(ShowDemandeComponent)
  }

  async affecter(rowData: any) {
    rowData.etat = "En cours";
    if(rowData.transporteur != null){
      this.transporteur = rowData.transporteur.id;
    } 
    this.demandeService.editDemande(rowData,rowData.conteneur.id,rowData.arm.id,this.agent.id,this.transporteur);
    this.source = await this.demandeService.getAll();
    this.toastService.success("Succès","Demande affectée avec succès!");
    
  }
}
