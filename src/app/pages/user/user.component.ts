import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { UserService } from './user.service';

@Component({
  selector: 'ngx-utilisateur',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ConfirmationService],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    ) { }
  source: any
  async ngOnInit() {
    this.source = await this.userService.getAll()
  }
  settings = {
    noDataMessage: "La table est vide",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      pseudo: {
        title: 'Pseudo',
        type: 'string',
      },
      mdp: {
        title: 'Mot de passe',
        type: 'string',
      },
      blocked: {
        title: 'Autorisation',
        filter: {
          type: 'list',
          config: {
            selectText: 'Autorisation',
            list: [
              { value: true , title: 'Bloqué' },
              { value: false , title: 'Autorisé' },  
          ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: true , title: 'Bloqué' },
              { value: false , title: 'Autorisé' },  
            ],
          },
        },
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value == false) {
            return '<span class="caption status-success"><b>✔</b></span>'
          } else {
            return '<span class="caption status-danger"><b>X</b></span>'
          }
        },
      },
      role: {
        title: 'Role',
        filter: {
          type: 'list',
          config: {
            selectText: 'Role',
            list: [
              { value: 'Admin', title: 'Administrateur' },
              { value: 'Agent', title: 'Agent' },
              { value: 'Armateur', title: 'Armateur' }
          ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'Admin', title: 'Administrateur' },
              { value: 'Agent', title: 'Agent' },
              { value: 'Armateur', title: 'Armateur' }
            ],
          },
        },
        type: 'string',
      },
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
      accept:  async () => {
       await this.userService.deleteUser(event.data.id);
        event.confirm.resolve();
      },
    });
  }
   
  async onCreateConfirm(event : any) {
      this.userService.addUser(event.newData);
      setTimeout(async () => {
        this.source = await this.userService.getAll()
      }, 3000);
      event.confirm.resolve(event.newData);
  }
  async onSaveConfirm(event) {
      await this.userService.editUser(event.newData);
      event.confirm.resolve(event.newData);
  }
}
