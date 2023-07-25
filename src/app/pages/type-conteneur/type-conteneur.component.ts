import { ModalTypeConteneurComponent } from './modal-type-conteneur/modal-type-conteneur.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { ConfirmationService } from 'primeng/api';
import { TypeConteneurService } from './type-conteneur.service';

@Component({
  selector: 'ngx-type-conteneur',
  templateUrl: './type-conteneur.component.html',
  styleUrls: ['./type-conteneur.component.scss'],
  providers:[ConfirmationService]
})
export class TypeConteneurComponent implements OnInit {

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
          name: "editAction",
          title: '<i class="nb-edit" title="Edit"></i>',
        },
      ],
    },
    columns: {
      nom: {
        title: "Nom",
        type: "string",
        width: '75%'
      }
    },
  };

  source:any;
  constructor(
    private typeConteneurService :TypeConteneurService,
    private confirmationService : ConfirmationService,
    private toastService : NbToastrService,
    private router : Router,
    private windowService : NbWindowService 
    ) { }

 async ngOnInit() {
    this.source = await this.typeConteneurService.getAll();
  }

  async confirmDelete(event){
    this.confirmationService.confirm({
      message: "voulez-vous supprimer cet enregistrement ?",
      header: "Confirmation de suppression",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-rounded p-button-success",
      rejectButtonStyleClass: "p-button-rounded p-button-danger",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        this.typeConteneurService.deleteTypeConteneur(event.data.id);
        this.toastService.warning("Succès","Type supprimé");
        this.router.navigateByUrl('/').then(()=>{
          this.router.navigate(["/pages/typeConteneur"]);
        });
      },
    });
  }

  openWindow(){
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e','0');
    this.windowService.open(ModalTypeConteneurComponent,{title : "Ajouter de conteneur"});
  }

  onCustom(event){
    localStorage.removeItem('e');
    localStorage.removeItem('id');
    localStorage.setItem('e','1');
    localStorage.setItem('id',event.data.id);
    this.windowService.open(ModalTypeConteneurComponent,{title : "Modifier Type de conteneur"});
  }
}
