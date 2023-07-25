import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ModalArmateurComponent } from './modal-armateur/modal-armateur.component';
import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ArmateurService } from './armateur.service';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ShowArmateurComponent } from './show-armateur/show-armateur.component';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ngx-conteneur-view',
  template:
  '<button type="button" class="btn btn-outline-info" style="width:100%" (click)="showConteneurs()">Conteneurs</button>',

})
export class ArmContComponent implements ViewCell, OnInit {

  @Input() value: number;
  rowData: any;

  ngOnInit() {}

  constructor(private router : Router) {
  }
  
  showConteneurs(){
    localStorage.setItem(environment.IDARMATEURCONTENEUR,this.value.toString());
    this.router.navigate(['/pages/conteneur'])
  }
}

@Component({
  selector: "ngx-armateur",
  templateUrl: "./armateur.component.html",
  styleUrls: ["./armateur.component.scss"],
  providers: [ConfirmationService],
})
export class ArmateurComponent implements OnInit {
  settings = {
    noDataMessage : "La table est vide",
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    rowClassFunction: (row) => {
      if(this.isAgent()){
        return "hide";
      }
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
      conteneurs: {
        title: "Conteneurs",
        type: 'custom',
        renderComponent: ArmContComponent,
        valuePrepareFunction: (cell, row) => {
          return row.id;
        }
      },
    },
  };

  source: any;
  constructor(
    private armateurService: ArmateurService,
    private toastService: NbToastrService,
    private windowService: NbWindowService,
    private confirmationService: ConfirmationService,
    private router :Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.source = await this.armateurService.getAll();
  }

  openWindow() {
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e","0");
    this.windowService.open(ModalArmateurComponent, { title: "Ajouter" });
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
        //this.userService.deleteUser(event.data.user.id);
        this.armateurService.deleteArmateur(event.data.id);
        this.toastService.warning("Succés", "Armateur supprimé");
        this.router.navigateByUrl("/").then(() => {
          this.router.navigate(["/pages/armateur"]);
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
      this.windowService.open(ModalArmateurComponent,{title : 'Modifier armateur'})
    }
    
    if(event.action === 'showAction'){
      localStorage.removeItem('id');
      localStorage.setItem('id',event.data.id);
      this.windowService.open(ShowArmateurComponent,{title : 'Afficher armateur'})
    }

  }

  isAgent(){
    let r = localStorage.getItem(environment.CONNECTEDUSERROLE);
    return r == 'Agent';
  }
  
}