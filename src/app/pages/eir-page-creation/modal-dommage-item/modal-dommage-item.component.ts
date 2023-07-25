import { DommageItemService } from './../dommage-item.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { TypeDommageService } from '../../type-dommage/type-dommage.service';
import { DommageItem } from '../dommage-item';
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'ngx-modal-dommage-item',
  templateUrl: './modal-dommage-item.component.html',
  styleUrls: ['./modal-dommage-item.component.scss']
})
export class ModalDommageItemComponent implements OnInit {

  listeDommage: any;
  selectedDommage: any;
  selectedDescription: any;
  selectedDetail: any;
  dommageItem: DommageItem;
  msg: string;
  T:string;
  dommages = [
    { id: 'CR', name: 'CR' },
    { id: 'DF', name: 'DF' },
    { id: 'CS', name: 'CS' },
    { id: 'CP', name: 'CP' },
    { id: 'MA', name: 'MA' },
    { id: 'RG', name: 'RG' },
    { id: 'FR', name: 'FR' },
    { id: 'DH', name: 'DH' },
    { id: 'PF', name: 'PF' },
    { id: 'RAP', name: 'RAP' },
    { id: 'RG/DF', name: 'RG/DF' },
  ];

  details = [
    { id: 'Supérieur', name: 'Supérieur' },
    { id: 'Inférieur', name: 'Inférieur' },
    { id: 'Avant', name: 'Avant' },
    { id: 'Arrière', name: 'Arrière' },
    { id: 'Latéral', name: 'Latéral' },
  ];

  constructor(
    private windowRef: NbWindowRef,
    private dommageService: TypeDommageService,
    private dommageItemService: DommageItemService,
    private toastService: NbToastrService
  ) { }

  async ngOnInit(){
    this.dommageItem = new DommageItem();
    this.listeDommage = await this.dommageService.getAll();
    let e  = localStorage.getItem('e');
    if(e === '0'){
      this.T = "Ajouter"; 
    }
    if (e === "1") {
      let id = localStorage.getItem("id");
      this.T = "Modifier";
      this.dommageItem = await this.dommageItemService.getDommageItemById(+id);
      this.selectedDescription = this.dommageItem.dommage.id;
      this.selectedDommage = this.dommageItem.dommageValue;
      this.selectedDetail = this.dommageItem.detail;
    }
  }

  fermer(){
    this.windowRef.close();
  }

  onSave(){
    let e = localStorage.getItem('e');
    let id = localStorage.getItem('id');
    this.dommageItem.dommageValue = this.selectedDommage;
    this.dommageItem.detail = this.selectedDetail;
    if(e==='0'){  
      this.dommageItemService.addDommageItem(this.dommageItem, this.selectedDescription, +id);
    }
    if(e==='1'){
      this.dommageItemService.editDommageItem(this.dommageItem,this.selectedDescription,this.dommageItem.eir.id);
    }
    this.toastService.success("Succès", "Dommage ajouté avec succès");
    this.windowRef.close();
  }

  verifPosition(value: string){
    this.msg = null;
    if(value!= null){
      if(value.length == 3){
        if(_isNumberValue(value)){
          if(value.substring(0,1)=='1' || value.substring(0,1)=='2'){
            if(!(Number(value.substring(1))>0 && Number(value.substring(1))<=16)){
              this.msg="position non valide";
            }
          }else if(value.substring(0,1)=='3' || value.substring(0,1)=='4'){
            if(!(Number(value.substring(1))>0 && Number(value.substring(1))<=20)){
              this.msg="position non valide";
            }
          }else if(value.substring(0,1)=='5' || value.substring(0,1)=='6' || value.substring(0,1)=='7'){
            if(!(Number(value.substring(1))>0 && Number(value.substring(1))<=10)){
              this.msg = "position non valide";
            }
          }else{
            this.msg = "face de conteneur non valide";
          }
        }else{
          this.msg = "faux format";
        }
      }else if(value.length == 6){
        let val1 = value.substring(0,3);
        let dash = value.substring(3,4);
        let val2 = value.substring(4);
        if(_isNumberValue(val1) && _isNumberValue(val2) && dash == '-'){
          if(val1.substring(0,1)=='1' || val1.substring(0,1)=='2'){
            if(!(Number(val1.substring(1))>0 && Number(val1.substring(1))<16 && Number(val2)>Number(val1.substring(1)) && Number(val2)<=16)){
              this.msg = "position non valide";
            }
          }else if(val1.substring(0,1)=='3' || val1.substring(0,1)=='4'){
            if(!(Number(val1.substring(1))>0 && Number(val1.substring(1))<20 && Number(val2)>Number(val1.substring(1)) && Number(val2)<=20)){
              this.msg = "position non valide";
            }
          }else if(val1.substring(0,1)=='5' || val1.substring(0,1)=='6' || val1.substring(0,1)=='7'){
            if(!(Number(val1.substring(1))>0 && Number(val1.substring(1))<10 && Number(val2)>Number(val1.substring(1)) && Number(val2)<=10)){
              this.msg = "position non valide";
            }
          }else{
            this.msg = "face de conteneur non valide";
          }
        }else{
          this.msg = "faux format";
        }
      }else{
        this.msg = "position erroné";
      }
    } 
  }
  
 
}
