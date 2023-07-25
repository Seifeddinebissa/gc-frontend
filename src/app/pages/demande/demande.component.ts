import { ArmateurService } from "./../armateur/armateur.service";
import { ModalDemandeComponent } from "./modal-demande/modal-demande.component";
import { NbToastrService, NbWindowService } from "@nebular/theme";
import { Component, OnInit, Input, Output } from "@angular/core";
import { DemandeService } from "./demande.service";
import { ConfirmationService } from "primeng/api";
import { Router } from "@angular/router";
import { ShowDemandeComponent } from "./show-demande/show-demande.component";
import { environment } from "../../../environments/environment";
import { Armateur } from "../armateur/armateur";
import { ViewCell } from "ng2-smart-table";
import { Eir } from "../eir-page-creation/eir";
import { EirService } from "../eir-page-creation/eir.service";
import { ShowEirPdfComponent } from "../eir-page-creation/show-eir-pdf/show-eir-pdf.component";

@Component({
  selector: "ngx-button-eir",
  template:
    '<div class="container-btn">' +
    '<button nbButton hero status="info" [disabled]="value" (click)="openEir()"><nb-icon icon="file-text-outline"></nb-icon></button>' +
    "</div>",
})
export class ButtonViewEIRDemandeArmateur implements OnInit {

  @Input() value: string;
  @Input() rowData:any;
    eir:Eir;
  ngOnInit() {
  }
  constructor(
    private router: Router,
    private eirService: EirService,
    private windowService: NbWindowService
    ) {}

  
async openEir(){
    this.eir = await this.eirService.getByDemandeId(this.rowData.id);
    localStorage.setItem('id',this.eir.id.toString());
    this.windowService.open(ShowEirPdfComponent,{title: "Afficher EIR"});
  }
}

@Component({
  selector: "ngx-demande",
  templateUrl: "./demande.component.html",
  styleUrls: ["./demande.component.scss"],
  providers: [ConfirmationService],
})
export class DemandeComponent implements OnInit {
  settings = {
    noDataMessage: "La table est vide",
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
          name: "showAction",
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: "editAction",
          title: '<i class="nb-edit" title="Edit"></i>',
        },
      ],
    },
    rowClassFunction: (row) => {
      if (this.isAdmin()) {
        return "hide2";
      }else if(row.data.etat !== "Reçue" && !this.isAdmin()){
        return "hide1";
      }
    },
    columns: {
      conteneur: {
        title: "Matricule",
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
        renderComponent: ButtonViewEIRDemandeArmateur,
        valuePrepareFunction: (cell, row) => {
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
  arm: Armateur;
  role: string;
  constructor(
    private demandeService: DemandeService,
    private confirmationService: ConfirmationService,
    private toastService: NbToastrService,
    private router: Router,
    private windowService: NbWindowService,
    private armateurService: ArmateurService
  ) {}

  async ngOnInit() {
    this.role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    let id = localStorage.getItem(environment.CONNECTEDUSER);
    if (this.role === "Armateur") {
      this.arm = new Armateur();
      this.arm = await this.armateurService.getArmateurByUserId(+id);
      this.source = await this.demandeService.getByArmateurId(this.arm.id);
    }
    if (this.role === "Admin") this.source = await this.demandeService.getAll();
    
  }

  confirmDelete(event) {
    this.confirmationService.confirm({
      message: "voulez-vous supprimer cet enregistrement ?",
      header: "Confirmation de suppression",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-rounded p-button-success",
      rejectButtonStyleClass: "p-button-rounded p-button-danger",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        this.demandeService.deleteDemande(event.data.id);
        this.toastService.warning("Succés", "Demande supprimé");
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => {
            this.router.navigate(["/pages/demande"]);
          });
      },
    });
  }

  onCustom(event) {
    if (event.action === "editAction") {
      localStorage.removeItem("e");
      localStorage.removeItem("id");
      localStorage.setItem("e", "1");
      localStorage.setItem("id", event.data.id);
      this.windowService.open(ModalDemandeComponent, {
        title: "Modifier demande",
      });
    }
    if (event.action === "showAction") {
      localStorage.removeItem("id");
      localStorage.setItem("id", event.data.id);
      this.windowService.open(ShowDemandeComponent, {
        title: "Afficher demande",
      });
    }
  }
  openWindow() {
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e", "0");
    this.windowService.open(ModalDemandeComponent, {
      title: "Ajouter",
      closeOnBackdropClick: false,
    });
  }

  isAdmin(){
    let r = localStorage.getItem(environment.CONNECTEDUSERROLE);
    return r == 'Admin';
  }
}
