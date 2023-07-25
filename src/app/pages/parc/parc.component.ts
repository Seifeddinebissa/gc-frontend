import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import { ParcService } from './parc.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { ConfirmationService } from 'primeng/api';
import { ModalParcComponent } from './modal-parc/modal-parc.component';

@Component({
  selector: "ngx-button-eir",
  template:
    '<div class="container-btn">' +
    '<button nbButton hero status="info" (click)="onClick()"><nb-icon icon="cube-outline"></nb-icon></button>' +
    "</div>",
})
export class ButtonViewParcConteneur implements OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();

  }
  constructor(private router: Router) {
  }
  onClick() {
    localStorage.setItem('idParc', this.rowData.id);
    this.router.navigate(['/pages/conteneurParc']);
  }
}



@Component({
  selector: 'ngx-parc',
  templateUrl: './parc.component.html',
  styleUrls: ['./parc.component.scss'],
  providers: [ConfirmationService],
})
export class ParcComponent implements OnInit {
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
    rowClassFunction: (row) => {
      if(this.isAgent()){
        return 'hide';
      }
    },
    columns: {
      name: {
        title: "Nom",
        type: "string",
      },
      addresse: {
        title: "Addresse",
        type: "string",
      },
      capacite: {
        filter: false,
        title: "Capacité",
        type: "string",
      },
      conteneur: {
        title: "Conteneur",
        type: "custom",
        renderComponent: ButtonViewParcConteneur,
        filter: false,
        show: false,
        addable: false,
        editable: false,
        width: "11px",
      },
    },
  };
  source: any;
  constructor(
    private parcService: ParcService,
    private toastService: NbToastrService,
    private windowService: NbWindowService,
    private confirmationService: ConfirmationService,
    private router :Router,
    private loginService : LoginService
  ) { }

  async ngOnInit(){
    this.source = await this.parcService.getAll();
    localStorage.removeItem("idParc")
  }
  openWindow() {
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e", "0");
    this.windowService.open(ModalParcComponent, { title: "Ajouter" });
  }

  onCustom(event){
    if(event.action === 'editAction'){
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      localStorage.setItem('e', '1');
      localStorage.setItem('id',event.data.id)
      this.windowService.open(ModalParcComponent,{title : 'Modifier ce parc'})
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
      this.parcService.deleteParc(event.data.id);
      this.toastService.warning("Succés", "Parc supprimé");
      this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/parc"]);
      });
    },
  });
}

isAgent():boolean{
  return this.loginService.isAgent();
}
}

