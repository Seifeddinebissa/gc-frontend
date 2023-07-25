import { Router } from '@angular/router';
import { ConteneurService } from './../conteneur.service';
import { NbWindowRef, NbToastrService, NbTabsetComponent, NbTabComponent } from '@nebular/theme';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Conteneur } from '../conteneur';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { GoogleCloudVisionService } from '../../google-vision/google-cloud-vision.service';
import { TypeConteneurService } from '../../type-conteneur/type-conteneur.service';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../user/user.service';
import { ArmateurService } from '../../armateur/armateur.service';
import { Armateur } from '../../armateur/armateur';

@Component({
  selector: "ngx-modal-conteneur",
  templateUrl: "./modal-conteneur.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./modal-conteneur.component.scss"],
})
export class ModalConteneurComponent implements OnInit {
  T: string;
  conteneur: Conteneur;
  msg:string;
  types:any;
  selectedType:number;
  selectedItem:any;
  selectedArmateur: number;
  armateurs:any;
  isAdmin : boolean = false;
  armateurId: number;
  //cam variables
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  resultScan: string
  // latest snapshot
  public webcamImage: WebcamImage = null;
  public base64Image: string;
  public visionresponse: string;
  public objvisionresponse: string;




  constructor(
    private windowRef: NbWindowRef,
    private conteneurService: ConteneurService,
    private armateurService: ArmateurService,
    private router: Router,
    private toastService: NbToastrService,
    private visionService: GoogleCloudVisionService,
    private typeConteneurService: TypeConteneurService
  ) {}

  async ngOnInit() {
    let role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    if(role == environment.ADMIN){
      this.isAdmin = true;
    }
    this.conteneur = new Conteneur();
    let e = localStorage.getItem("e");
    if (e === "0") {
      this.T = "Ajouter";
    }
    if (e === "1") {
      let id = localStorage.getItem("id");
      this.T = "Modifier";
      this.conteneur = await this.conteneurService.getConteneurById(+id);
      this.selectedType = this.conteneur.conteneurType.id;
      this.selectedArmateur = this.conteneur.armateur.id;
    }
    this.types = await this.typeConteneurService.getAll();
    this.armateurs = await this.armateurService.getAll();
    this.armateurs.map((item)=>{
      item.fullName = item.prenom + ' ' + item.nom;
    });
    //init cam
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  async onSave() {
    let e = localStorage.getItem("e");
    let idArm = localStorage.getItem(environment.CONNECTEDUSER);
    if(this.isAdmin){
      this.armateurId = this.selectedArmateur;
    }else{
      this.armateurId = (await this.armateurService.getArmateurByUserId(+idArm)).id;
    }
    if (e === "0") {
      this.conteneur.status = "non parqué"
      let exist = await this.conteneurService.conteneurExist(this.conteneur.marquage);
      if(!exist){
        this.conteneur.marquage = this.conteneur.marquage.toUpperCase();
        this.conteneurService.addConteneur(this.conteneur,this.armateurId,this.selectedType);
        this.toastService.success("Succès", "Conteneur ajouté avec succés");
        this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/conteneur"]);
        localStorage.removeItem("e");
        this.windowRef.close();
        });
      }else{
        this.toastService.warning("Avertissement","Le conteneur est existe déjà!");
      }
    }
    if (e === "1") {
      this.conteneurService.editConteneur(this.conteneur,this.armateurId,this.selectedType);
      localStorage.removeItem("e");
      localStorage.removeItem("id");
      this.windowRef.close();
      this.toastService.success("Succès", "Conteneur modifié avec succés");
      this.router.navigateByUrl("/").then(() => {
        this.router.navigate(["/pages/conteneur"]);
      });
    }
  }

  fermer() {
    this.windowRef.close();
  }

  checkMarquage(value: String) {
    if(value.length!=11){
      this.msg = "Le marquage contient 11 caractères!";
    }else{
      this.msg=null;
    let sum = 0;
    let b = 0;
    for (let index = 0; index < 4; ++index) {
      b = value.charCodeAt(index);
      if ((b >= 65 && b <= 90) || (b >= 97 && b <= 122)) {
        b = b;
      } else {
        this.msg = "Les 4 premiers caractère doit etre alphabitique";
      }
    }

    for (let index = 4; index < 10; ++index) {
      b = value.charCodeAt(index);
      if (b >= 48 && b <= 57) {
        b = b;
      } else {
        this.msg = "Les 6 dernièrs caractère doit etre numérique";
      }
    }

    for (let index = 0; index < 10; ++index) {
      b = value.charCodeAt(index);
      if (b == 65 || b == 97) {
        b = 10;
      }
      if (b >= 66 && b <= 75) {
        b = b - 54;
      }
      if (b >= 98 && b <= 107) {
        b = b - 54 - 32;
      }
      if (b >= 76 && b <= 85) {
        b = b - 53;
      }
      if (b >= 108 && b <= 117) {
        b = b - 53 - 32;
      }
      if (b >= 86 && b <= 90) {
        b = b - 52;
      }
      if (b >= 118 && b <= 122) {
        b = b - 52 - 32;
      }
      if (b >= 48 && b <= 57) {
        b = b - 48;
      }
      let c = b * Math.pow(2, index);
      sum = sum + c;
    }
    let cc = sum - Math.floor(sum / 11) * 11;

    if (value.charAt(10) != cc.toString()) {
      this.msg = 'Erreurs dans les caractères';
    } else {
      this.msg =null;
    }
    }
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }


  public cameraWasSwitched(deviceId: string): void {
   // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  takePhotoAndScan(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.base64Image = this.webcamImage.imageAsBase64
    this.visionService.getText(this.base64Image).subscribe((result) => {
      this.base64Image = "data:image/jpg;base64," + this.base64Image;
      const texts = result['responses'][0]['fullTextAnnotation']['text']
      if (texts === undefined || texts === null) {
        this.visionresponse = texts;
        this.resultScan = "rien"
      } else {
        this.resultScan = texts
        this.conteneur.marquage = this.resultScan
        //change tabset selction
      }
    }, error => {
      //console.log("ERROR -> " + JSON.stringify(error));
      this.resultScan = "ERROR"
    });
  }

  onChangeType(event){
    
  }

  
}
