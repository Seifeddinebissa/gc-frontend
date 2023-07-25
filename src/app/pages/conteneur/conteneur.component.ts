import { ModalConteneurComponent } from './modal-conteneur/modal-conteneur.component';
import { NbToastrService, NbWindowService, NbWindowRef } from '@nebular/theme';
import { ConteneurService } from './conteneur.service';
import { ConfirmationService } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { environment } from '../../../environments/environment';
import { ArmateurService } from '../armateur/armateur.service';
import { ShowConteneurComponent } from './show-conteneur/show-conteneur.component';

@Component({
  selector: 'ngx-color-view',
  template:
  "<span [style.color]='renderValue' [style.fontSize.px]='35' [style.marginRight.px]='-10'>&#9724;</span><span [style.color]='renderValue' [style.fontSize.px]='35' [style.fontSize.px]='35' [style.marginRight.px]='-10'>&#9724;</span><span [style.color]='renderValue' [style.fontSize.px]='35' >&#9724;</span>",

})
export class ColorViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  

  ngOnInit() {
    if(this.value)
      this.renderValue = this.value.toString();
  }
  constructor() {
  }
  rowData: any;
  
}

@Component({
  selector: 'ngx-conteneur',
  templateUrl: './conteneur.component.html',
  styleUrls: ['./conteneur.component.scss'],
  providers:[ConfirmationService]
})
export class ConteneurComponent implements OnInit {

  settings = {
    noDataMessage :"La table est vide",
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
        }
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
      couleur1: {
        title: "Couleur",
        type: 'custom',
        renderComponent: ColorViewComponent,
      },
      status:{
        title:"Status",
        filter: {
          type: 'list',
          config: {
            selectText: 'Status',
            list: [
              { value: "in" , title: 'in' },
              { value: "out" , title: 'out' },  
          ],
          },
        },
      }
    },
  };

  source : any;
  role: string;

  constructor(
    private conteneurService : ConteneurService,
    private confirmationService : ConfirmationService,
    private toastService : NbToastrService,
    private router : Router,
    private windowService : NbWindowService,
    private armateurService : ArmateurService
  ) { }

  async ngOnInit(){
    this.role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    let id = localStorage.getItem(environment.CONNECTEDUSER);
    if(this.role == "Armateur"){
      let idArm = await this.armateurService.getArmateurByUserId(+id);
      this.source = await this.conteneurService.findByArmateurId(idArm.id);
    }else{
      let idArm = localStorage.getItem(environment.IDARMATEURCONTENEUR);
      localStorage.removeItem(environment.IDARMATEURCONTENEUR);
      if(idArm != null){
        this.source = await this.conteneurService.findByArmateurId(+idArm);
      }else{
        this.source = await this.conteneurService.getAll();
      }
    }
  }
  
  confirmDelete(event){
    this.confirmationService.confirm({
      message: "voulez-vous supprimer cet enregistrement ?",
      header: "Confirmation de suppression",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-rounded p-button-success",
      rejectButtonStyleClass: "p-button-rounded p-button-danger",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        this.conteneurService.deleteConteneur(event.data.id);
        this.toastService.warning("Succés", "Conteneur supprimé");
        this.router.navigateByUrl("/").then(() => {
          this.router.navigate(["/pages/conteneur"]);
        });
      },
    });
  }

  onCustom(event){
    if(event.action === "editAction"){
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('e','1');
      localStorage.setItem('id',event.data.id);
      this.windowService.open(ModalConteneurComponent,{title:"Modifier conteneur"});
    }
    if(event.action === 'showAction'){
      localStorage.removeItem('id');
      localStorage.setItem('id',event.data.id);
      this.windowService.open(ShowConteneurComponent,{title : 'Afficher conteneur'})
    }
  }

  openWindow(){
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e", "0");
    this.windowService.open(ModalConteneurComponent, {title:"Ajouter conteneur"})
  }
}
