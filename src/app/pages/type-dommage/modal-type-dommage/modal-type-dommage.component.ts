import { Component, OnInit } from '@angular/core';
import { Dommage } from '../dommage';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { TypeDommageService } from '../type-dommage.service';

@Component({
  selector: 'ngx-modal-type-dommage',
  templateUrl: './modal-type-dommage.component.html',
  styleUrls: ['./modal-type-dommage.component.scss']
})
export class ModalTypeDommageComponent implements OnInit {

  A: string
  dommage : Dommage
  constructor(private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private dommageService: TypeDommageService,) { }

  async ngOnInit() {
    let e = localStorage.getItem('e');
    this.dommage = new Dommage()
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let id = localStorage.getItem('id');
      this.dommage = await this.dommageService.getById(+id)
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onSave() {
    let e = localStorage.getItem('e');
    //this.dommage.intitule = this.dommage.intitule[0].toUpperCase() + this.dommage.intitule.slice(1)
    if (e === '0') {
      this.dommageService.addDommage(this.dommage);
        localStorage.removeItem('e');
        localStorage.removeItem('id');
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/typeDommage']));
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/typeDommage']));
        this.toastrService.success("Succès", "Dommage ajouté");
    }
    if (e === '1') {
      this.dommageService.editDommage(this.dommage)
      localStorage.removeItem('e');
      localStorage.removeItem('id');
      this.windowRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/pages/typeDommage']));
      this.toastrService.success("Succès", "Dommage modifié");
    }
  }

}
