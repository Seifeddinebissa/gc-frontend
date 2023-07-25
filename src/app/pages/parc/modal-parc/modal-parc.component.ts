import { Component, OnInit } from '@angular/core';
import { Parc } from '../parc';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { ParcService } from '../parc.service';
@Component({
  selector: 'ngx-modal-parc',
  templateUrl: './modal-parc.component.html',
  styleUrls: ['./modal-parc.component.scss']
})
export class ModalParcComponent implements OnInit {
 parc : Parc;
  T : string;
  constructor(
    private windowRef : NbWindowRef,
    private parcService : ParcService, 
    private toastService : NbToastrService,
    private router : Router
) { }

async ngOnInit() {
  this.parc = new Parc;
    let e = localStorage.getItem('e');
    if(e === '0')
    this.T = "Ajouter";
    if(e === '1'){
      this.T = "Modifier";
      let id  = localStorage.getItem('id');
      this.parc = await this.parcService.getById(Number(id));
      console.log(this.parc);
    }
  }

  fermer(){
    this.windowRef.close();
  }

  async onSave(){
    let e = localStorage.getItem('e');
    if(e === '0'){
      this.parcService.addParc(this.parc);
      localStorage.removeItem('e');
      this.windowRef.close();
      this.router.navigateByUrl('/',).then(()=>{
         this.router.navigate(['/pages/parc']);
       });
      this.toastService.success("Succès","Parc ajouté avec succés");
    }
    if (e === "1") {
      console.log(this.parc);
      this.parcService.editParc(this.parc);
      localStorage.removeItem("e");
      localStorage.removeItem("id");
      this.toastService.success("Succès", "Parc modifié");
      this.windowRef.close();
      this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/parc"]);
      });
    }
  }


}

