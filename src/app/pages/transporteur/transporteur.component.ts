import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { TransporteurService } from './transporteur.service';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ShowTransporteurComponent } from './show-transporteur/show-transporteur.component';
import { ModalTransporterComponent } from './modal-transporter/modal-transporter.component';
import { environment } from '../../../environments/environment';


@Component({
  selector: "ngx-transporteur",
  templateUrl: "./transporteur.component.html",
  styleUrls: ["./transporteur.component.scss"],
  providers: [ConfirmationService],
})
export class TransporteurComponent implements OnInit {
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
    rowClassFunction: (row) => {
      if(this.isAgent()){
        return 'hide';
      }
    }
    ,
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
    private transporteurService: TransporteurService,
    private toastService: NbToastrService,
    private windowService: NbWindowService,
    private confirmationService: ConfirmationService,
    private router :Router
  ) {}

  async ngOnInit() {
    this.source = await this.transporteurService.getAll();
  }

  openWindow() {
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e", "0");
    this.windowService.open(ModalTransporterComponent, { title: "Ajouter" });
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
        this.transporteurService.deleteTransporteur(event.data.id);
        this.toastService.warning("Succés", "Transporteur supprimé");
        this.router.navigateByUrl("/").then(() => {
          this.router.navigate(["/pages/transporteur"]);
        });
      },
    });
  }

  onCustom(event){
    if(event.action === 'editAction'){
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('e', '1');
      localStorage.setItem('id',event.data.id)
      this.windowService.open(ModalTransporterComponent,{title : 'Modifier transporteur'})
    }
    
    if(event.action === 'showAction'){
      localStorage.removeItem('id');
      localStorage.setItem('id',event.data.id);
      this.windowService.open(ShowTransporteurComponent,{title : 'Afficher transporteur'})
    }
  }

  isAgent(){
    let r = localStorage.getItem(environment.CONNECTEDUSERROLE);
    return r == "Agent";
  }
}
