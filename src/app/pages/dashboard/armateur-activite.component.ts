import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande/demande.service';
import { format } from 'date-fns';

@Component({
  selector: 'ngx-armateur-activite',
  template:`
  <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  `,
})
export class ArmateurActiviteComponent implements OnInit {

  settings = {
    noDataMessage : "La table est vide",
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      arm: {
        filter: false,
        title: "Armateur",
        type: "string",
        valuePrepareFunction: (data) => {
          return data.nom+' '+data.prenom;
        },
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
      etat: {
        filter: false,
        title: "Etat",
        type: "string",
      },
    },
  };

  source:any;

  constructor(
    private demandeService: DemandeService
  ) { }

  async ngOnInit(){
    let date = new Date();
    this.source = await this.demandeService.getByDateCreation(format(date,'yyyy-MM-dd'));
    console.log(this.source)
  }

}
