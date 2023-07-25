import { filter, map } from 'rxjs/operators';
import { ConteneurService } from "./../../conteneur/conteneur.service";
import { DemandeService } from "./../demande.service";
import { ArmateurService } from "./../../armateur/armateur.service";
import { NbWindowRef, NbToastrService } from "@nebular/theme";
import { Component, OnInit } from "@angular/core";
import { Demande } from "../demande";
import { environment } from "../../../../environments/environment";
import { ParcService } from "../../parc/parc.service";
import { Router } from "@angular/router";
import { Conteneur } from "../../conteneur/conteneur";
import { LastDemandes } from '../last-demandes';
import { TransporteurService } from '../../transporteur/transporteur.service';
@Component({
  selector: "ngx-modal-demande",
  templateUrl: "./modal-demande.component.html",
  styleUrls: ["./modal-demande.component.scss"],
})
export class ModalDemandeComponent implements OnInit {
  demande: Demande;
  conteneur: Conteneur;
  demandesByType: LastDemandes[] = [];
  demModif: LastDemandes;
  cnd:any;
  demandes : any;
  parcs: any;
  transporteurs: any;
  selectedConteneur: number;
  selectedType: string;
  selectedParc: number;
  idArm: number;
  selectedTransporteur: number;
  selectedArmateur: number;
  T: string;
  disabledConteneur: boolean;
  disabledParc: boolean;
  msg : string =null;
  selectedPhase: string;
  types = [
    { bindLable: "Entrée", bindValue: "Entrée" },
    { bindLable: "Sortie", bindValue: "Sortie" },
  ];

  constructor(
    private windowRef: NbWindowRef,
    private contneurService: ConteneurService,
    private armateurService: ArmateurService,
    private parcService: ParcService,
    private demandeService: DemandeService,
    private toastService: NbToastrService,
    private transporteurService: TransporteurService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.demande = new Demande();
    this.disabledConteneur = true;
    this.disabledParc = true;
    let idUser = localStorage.getItem(environment.CONNECTEDUSER);
    this.idArm = (await this.armateurService.getArmateurByUserId(Number(idUser))).id;
    this.parcs = await this.parcService.getAll();
    this.transporteurs = await this.transporteurService.getAll();
    this.transporteurs.map((item)=>{
      item.fullName = item.prenom + ' ' + item.nom;
    });
    
    this.demandes = await this.demandeService.findLastDemandeTraite();
    let e = localStorage.getItem("e");
    if (e === "0") {
      this.T = "Ajouter";
    }
    if (e === "1") {
      this.demModif = new LastDemandes();
      let id = localStorage.getItem("id");
      this.T = "Modifier";
      this.demande = await this.demandeService.getDemandeById(+id);
      this.demModif.id = this.demande.conteneur.id;
      this.demModif.marquage = this.demande.conteneur.marquage;
      this.demModif.type = this.demande.typeDemande;
      this.demModif.date = this.demande.dateCreation;
      this.demandesByType.push(this.demModif);
      console.log(this.demandesByType)
      this.selectedConteneur = this.demandesByType[0].id;
      console.log(this.selectedConteneur)
      this.selectedType = this.demande.typeDemande;
      this.selectedParc = this.demande.conteneur.parc.id;
    }
    
  }

  async onSave() {
    let e = localStorage.getItem("e");
    if (e === "0") {
      this.demande.phase = this.selectedPhase;
      this.demande.typeDemande = this.selectedType;
      this.demande.etat = "Reçue";
      this.demande.idParcDemande = this.selectedParc;
      if(!this.selectedTransporteur){
        this.selectedTransporteur = -1;
      }
      let res = this.demandeService.addDemande(this.demande,this.selectedConteneur,this.idArm,this.selectedTransporteur);
      localStorage.removeItem("e");
      localStorage.removeItem("id");
      this.windowRef.close();
      if (res != null) {
        this.toastService.success("Succès", "Demande ajoutée avec succée");
      } else {
        this.toastService.danger("Echèc", "Demande erronée");
      }
      this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
        this.router.navigate(["pages/demande"]);
      });
    }

    if (e === "1") {
      this.demande.typeDemande = this.selectedType;
      this.demandeService.editDemande(this.demande,this.selectedConteneur,this.idArm,-1,-1);
      localStorage.removeItem("e");
      localStorage.removeItem("id");
      this.windowRef.close();
      this.toastService.success("Succès", "Demande modifié avec succés");
      this.router.navigateByUrl("/",{skipLocationChange:true}).then(() => {
        this.router.navigate(["/pages/demande"]);
      });
    }
  }

  fermer() {
    this.windowRef.close();
  }

  async onChangeType(event){
    this.disabledConteneur = false;
    this.selectedConteneur = null;
    let e = localStorage.getItem("e");
    if(e === '0'){  
      if(event != null){
        if(event.bindValue === "Sortie"){
        this.selectedParc = null;
        this.disabledParc = true;
        this.demandesByType = this.filterType(this.demandes,"Entrée");
      }
      if(event.bindValue === "Entrée"){
        this.disabledParc = false;
        this.demandesByType = this.filterType(this.demandes,"Sortie");
        this.cnd = await this.contneurService.findConteneurNotInDemande()
        this.demandesByType = this.demandesByType.concat(this.cnd);
      }
      }
    }
  }

  async onChangeConteneur(event){
    let p = null;
    if(event != null){
      p = await this.contneurService.getConteneurById(event.id);
      if(p.parc != null)
        this.selectedParc = p.parc.id;
      else
        this.selectedParc = null;
    }
       
  }

  filterType(demande:any, type:string){
    return demande.filter(function(item){
      return item.type == type;
    });
  }

  
}
