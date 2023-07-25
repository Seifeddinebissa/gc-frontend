import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { TypeConteneurService } from './../type-conteneur.service';
import { Component, OnInit } from '@angular/core';
import { TypeConteneur } from '../type-conteneur';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-modal-type-conteneur',
  templateUrl: './modal-type-conteneur.component.html',
  styleUrls: ['./modal-type-conteneur.component.scss']
})
export class ModalTypeConteneurComponent implements OnInit {

  type : TypeConteneur;
  T : string;
  constructor(
    private typeConteneurService : TypeConteneurService,
    private windowRef : NbWindowRef,
    private toastService : NbToastrService,
    private router : Router
  ) { }

  async ngOnInit(){
    this.type = new TypeConteneur();
    let e = localStorage.getItem('e');
    if(e === '0'){
      this.T = "Ajouter";
    }
    if(e === '1'){
      this.T = "Modifier";
      let id = localStorage.getItem('id');
      this.type = await this.typeConteneurService.getTypeConteneurById(+id);
    }
  }

  onSave(){
    let e = localStorage.getItem('e');
    if(e === '0'){
      this.typeConteneurService.addTypeConteneur(this.type);
      localStorage.removeItem('e');
      this.windowRef.close();
      this.router.navigateByUrl('/').then(()=>{
        this.router.navigate(['/pages/typeConteneur']);
      });
      this.toastService.success("Succès","Type ajouté avec succès");
    }
    if(e === '1'){
      this.typeConteneurService.updateTypeConteneur(this.type);
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.toastService.success("Succès ","type supprimé avec succès");
      this.router.navigateByUrl('/').then(()=>{
        this.router.navigate(['pages/typeConteneur']);
      });
    }
  }

  fermer(){
    this.windowRef.close();
  }

}
