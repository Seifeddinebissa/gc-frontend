import { Component, OnInit } from '@angular/core';
import { ConteneurService } from '../../conteneur/conteneur.service';
import { ParcService } from '../parc.service';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { ColorViewComponent } from '../../conteneur/conteneur.component';
import { ConfirmationService } from 'primeng/api';
import { Parc } from '../parc';

@Component({
  selector: 'ngx-conteneur-parc',
  templateUrl: './conteneur-parc.component.html',
  styleUrls: ['./conteneur-parc.component.scss'],
  providers:[ConfirmationService]
})
export class ConteneurParcComponent implements OnInit {
  source : any;
  role: string;
  parc : Parc
  constructor(
    private conteneurService : ConteneurService,
    private parcService : ParcService
) { }

  async ngOnInit(): Promise<void> {
    this.parc = new Parc()
    this.role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    let idParc = localStorage.getItem("idParc")
    this.parc = await this.parcService.getById(+idParc)
    this.source = await this.conteneurService.findByParcId(+idParc)

  }

  settings = {
    noDataMessage :"parc vide",
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,

      custom: [

      ],
    },
    rowClassFunction: (row) => {
      if (this.role == "Agent") {
        return "hide";
      }
    },
    columns: {
      marquage: {
        title: "Matricule",
        type: 'string',
      },
      couleur: {
        title: "Couleur",
        type: 'custom',
        renderComponent: ColorViewComponent,

      },
    },
  };

}
