import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TypeDommageService } from './type-dommage.service';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ModalTypeDommageComponent } from './modal-type-dommage/modal-type-dommage.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-type-dommage',
  templateUrl: './type-dommage.component.html',
  styleUrls: ['./type-dommage.component.scss'],
  providers: [ConfirmationService],
})
export class TypeDommageComponent implements OnInit {

  source: any
  constructor(
    private dommageService : TypeDommageService,
    private windowService: NbWindowService,
    private toastService: NbToastrService,
    private confirmationService: ConfirmationService,
    private router :Router,) { }


  settings = {
    noDataMessage: "vide",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 8,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: true,

      custom: [
        {
          name: 'editAction',
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
      intitule: {
        title: 'intitule',
        type: 'string',
      },
      cout: {
        title: 'Coût',
        type: 'string',
      }
    }
  }

  async ngOnInit(){
    this.source = await this.dommageService.getAll();
  }
  openWindow() {
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e", "0");
    this.windowService.open(ModalTypeDommageComponent, { title: "Ajouter" });
  }

  onCustom(event){
    if(event.action === 'editAction'){
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('e', '1');
      localStorage.setItem('id',event.data.id)
      this.windowService.open(ModalTypeDommageComponent,{title : 'Modifier ce Type'})
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
      this.dommageService.deleteDommage(event.data.id);
      this.toastService.warning("Succés", "Dommage supprimé");
      this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/typeDommage"]);
      });
    },
  });
}

isAgent(){
  let r = localStorage.getItem(environment.CONNECTEDUSERROLE);
  return r == 'Agent';
}
}
