import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { TransporteurService } from './../transporteur.service';
import { Transporteur } from '../transporteur';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-modal-transporter',
  templateUrl: './modal-transporter.component.html',
  styleUrls: ['./modal-transporter.component.scss']
})
export class ModalTransporterComponent implements OnInit {
  transporter : Transporteur;
  T : string;
  constructor(
    private transporterService : TransporteurService,
    private windowRef : NbWindowRef,
    private toastService : NbToastrService,
    private router : Router
  ) { }

  async ngOnInit() {
    this.transporter = new Transporteur();
    let e = localStorage.getItem('e');
    if(e === '0'){
      this.T = "Ajouter";
    }
    if(e === '1'){
      this.T = "Modifier";
      let id = localStorage.getItem('id');
      this.transporter = await this.transporterService.getById(+id);
    }
  }

  onSave(){
    let e = localStorage.getItem('e');
    if(e === '0'){
      this.transporterService.addTransporteur(this.transporter);
      localStorage.removeItem('e');
      this.windowRef.close();
      this.router.navigateByUrl('/').then(()=>{
        this.router.navigate(['/pages/transporteur']);
      });
      this.toastService.success("Succès","Transporteur ajouté avec succès");
    }
    if(e === '1'){
      this.transporterService.editTransporteur(this.transporter);
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.toastService.success("Succès ","Transporteur supprimé avec succès");
      this.router.navigateByUrl('/').then(()=>{
        this.router.navigate(['pages/transporteur']);
      });
    }
  }

  fermer(){
    this.windowRef.close();
  }
 
}
