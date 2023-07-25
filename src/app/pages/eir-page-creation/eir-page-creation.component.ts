import { Parc } from './../parc/parc';
import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit
} from "@angular/core";
import { DatePipe} from "@angular/common";
import {  NbComponentStatus, NbToastrService } from "@nebular/theme";
import {  NbWindowService } from "@nebular/theme";
import { ModalDommageItemComponent } from "./modal-dommage-item/modal-dommage-item.component";
import { TransporteurService } from "../transporteur/transporteur.service";
import { Demande } from "../demande/demande";
import { DemandeService } from "../demande/demande.service";
import { Conteneur } from "../conteneur/conteneur";
import { Armateur } from "../armateur/armateur";
import { TypeConteneur } from "../type-conteneur/type-conteneur";
import { Eir } from "./eir";
import { EirService } from "./eir.service";
import {format} from 'date-fns';
import { ConteneurService } from "../conteneur/conteneur.service";
import { ParcService } from "../parc/parc.service";
import { DommageItemService } from "./dommage-item.service";
import { ShowDommageItemComponent } from "./show-dommage-item/show-dommage-item.component";
import { ShowEirPdfComponent } from "./show-eir-pdf/show-eir-pdf.component";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: "ngx-eir-page-creation",
  templateUrl: "./eir-page-creation.component.html",
  styleUrls: ["./eir-page-creation.component.scss"],
  providers: [DatePipe,ConfirmationService],
})
export class EirPageCreationComponent implements OnInit{
  settings = {
    noDataMessage: "La table est vide",
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
          name: "showAction",
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: "editAction",
          title: '<i class="nb-edit" title="Edit"></i>',
        },
      ],
    },
    // rowClassFunction: (row) => {
    //   if (this.isAdmin()) {
    //     return "hide2";
    //   }else if(row.data.etat !== "Reçue" && !this.isAdmin()){
    //     return "hide1";
    //   }
    // },
    columns: {
      dommage: {
        title: "Dommage",
        width:'55%',
        type: "string",
        filter: false,
        valuePrepareFunction: (data) => {
          return data.intitule;
        },
      },
      position: {
        title: "Position",
        type: "string",
        filter: false
      },
    },
  };
  source: any;
  demande: Demande;
  currentDate: Date = new Date();
  option: string = "1";
  showDommage: boolean;
  showVisualiser: boolean;

  options1 = [
    { value: "1", label: "IN" },
    { value: "0", label: "OUT" },
  ];
  options2 = [
    { value: "This is value 3", label: "EMPTY" },
    { value: "This is value 4", label: "LOADED" },
  ];
  


  statuses: NbComponentStatus[] = ["info"];
  selectedTransporteur: any;
  listeTransporteur: any;
  idDemande: number;
  typeDemande: string;
  btnText: string;
  conteneur: Conteneur;
  armateur: Armateur;
  typeConteneur: TypeConteneur;
  eir: Eir;
  savedEir: Eir;
  parc: Parc;

  constructor(
    protected httpclient: HttpClient,
    private windowService: NbWindowService,
    private transporteurService: TransporteurService,
    private demandeService: DemandeService,
    private eirService: EirService,
    private toastService: NbToastrService,
    private conteneurService: ConteneurService,
    private parcService: ParcService,
    private dommageItemService: DommageItemService,
    private confirmationService: ConfirmationService,
  ) {}
  

  async ngOnInit() {
    this.showDommage  = false;
    this.showVisualiser = false;
    this.btnText = "Valider";
    this.demande = new Demande();
    this.conteneur = new Conteneur();
    this.armateur = new Armateur();
    this.eir = new Eir();
    this.savedEir = new Eir();
    this.typeConteneur = new TypeConteneur();
    this.parc = new Parc();
    
    this.idDemande = +localStorage.getItem("idDemande");
    this.demande = await this.demandeService.getDemandeById(this.idDemande);
    this.parc = await this.parcService.getById(this.demande.idParcDemande);
    this.savedEir = await this.eirService.getByDemandeId(this.demande.id);
    if(this.savedEir != null){
      this.currentDate= new Date(this.savedEir.date+'T'+this.savedEir.time);
      this.showDommage = true;
      this.showVisualiser = true;
      this.btnText = "Modifier";
      this.eir = this.savedEir;
      this.source = await this.dommageItemService.getAllByEirId(this.savedEir.id);
    }

    this.listeTransporteur = await this.transporteurService.getAll();
    this.conteneur = this.demande.conteneur;
    this.typeConteneur = this.conteneur.conteneurType;
    this.armateur = this.demande.arm;
    if (this.demande.transporteur != null) {
      this.selectedTransporteur = this.demande.transporteur.id;
    } 
  }

  async openWindowDommage() {
    localStorage.removeItem("e");
    localStorage.removeItem("id");
    localStorage.setItem("e", "0");
    localStorage.setItem("id",this.savedEir.id.toString())
    this.windowService.open(ModalDommageItemComponent, { title: "Dommage" });
  }

  onPhase1Change(value: string) {
    this.typeDemande = value;
  }

  onPhase2Change(value: string) {
    this.demande.phase = value;
  }

  async onSaveEir() {
    this.eir.time = format(this.currentDate,'HH:mm');
    this.eir.date = format(this.currentDate,'yyyy-MM-dd')
    this.eir.phase = this.demande.phase;
    if(this.btnText == "Valider"){
      this.savedEir = await this.eirService.addEir(this.eir, this.demande.id);
      this.showVisualiser = true;
    }else{
      this.savedEir = await this.eirService.editEir(this.eir, this.demande.id);
    }
    this.demande.etat = "Traité";
    this.demandeService.editDemande(this.demande, this.demande.conteneur.id, this.demande.arm.id, this.demande.agent.id, this.selectedTransporteur);
    if(this.demande.typeDemande == "Sortie"){
      this.conteneur.status = "non parqué";
      this.conteneur.parc = null;
      this.conteneurService.editConteneur(this.conteneur,this.armateur.id,this.typeConteneur.id);
    }else{
      this.conteneur.status = "parqué";
      this.conteneur.parc = this.parc;
      this.conteneurService.editConteneur(this.conteneur,this.armateur.id,this.typeConteneur.id);
    }
    this.toastService.success("Succès","EIR crée avec succès");
    this.showDommage = true;
  }

  async reload(){
    this.source = await this.dommageItemService.getAllByEirId(this.savedEir.id);
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
        this.dommageItemService.deleteDommageItem(event.data.id);
        this.toastService.warning("Succés", "Dommage item supprimé");
        this.reload();
      },
    });
  }
  onCustom(event){
    if(event.action === "showAction"){
      localStorage.removeItem('id');
      localStorage.setItem('id',event.data.id);
      this.windowService.open(ShowDommageItemComponent, {
        title: "Afficher dommage item",
      });
    }
    if(event.action === "editAction"){
      localStorage.removeItem('e');
      localStorage.setItem('e', '1');
      localStorage.removeItem('id');
      localStorage.setItem('id',event.data.id);
      this.windowService.open(ModalDommageItemComponent,{title:"Modifier dommage item"});
    }
  }
  
  showInDialog(){
    localStorage.removeItem('id');
    localStorage.setItem('id',this.savedEir.id.toString());
    this.windowService.open(ShowEirPdfComponent,{title :'pdf view'})
  }
}
