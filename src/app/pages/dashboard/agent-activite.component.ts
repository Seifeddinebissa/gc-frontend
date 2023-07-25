import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande/demande.service';
import { format } from 'date-fns';

@Component({
  selector: 'ngx-agent-activite',
  template:`
   <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  `,
})
export class AgentActiviteComponent implements OnInit {
  settings = {
    noDataMessage : "La table est vide",
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,

    },
    columns: {
      agent: {
        filter: false,
        title: "Agent",
        type: "string",
        valuePrepareFunction: (data) => {
          return data.nom+' '+data.prenom;
        },
      },
      etat: {
        filter: false,
        title: "Activité",
        type: "string",
        valuePrepareFunction: (data) => {
          if(data == "Traité"){
            return "Traitement"
          }else{
            return "Affectation"
          }
        }
      },
      conteneur: {
        filter: false,
        title: "Conteneur",
        type: "string",
        valuePrepareFunction: (data) => {
          return data.marquage;
        },
      },
      typeDemande: {
        filter: false,
        title: "Type de demande",
        type: "string",
      },
      updateTime: {
        filter: false,
        title: "Heure",
        type: "string",
        valuePrepareFunction: (data) => {
          return data.substring(data.indexOf(' ')+1,data.length);
        }
      },
    },
  };

  source:any;
  constructor(
    private demandeService: DemandeService
  ) { }

  async ngOnInit(){
    
    let date = new Date();
    this.source = await this.demandeService.getByDateModification(format(date,'yyyy-MM-dd'));
    console.log(this.source)
  }

}
