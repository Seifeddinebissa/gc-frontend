 import { Transporteur } from './../transporteur/transporteur';
import { AgentParc } from "../agent-parc/agent-parc";
import { Armateur } from "../armateur/armateur";
import { Conteneur } from "../conteneur/conteneur";
import { Parc } from "../parc/parc";

export class Demande {
    id : number;
    idParcDemande:number;
    marchandise : string;
    etat : string;
    typeDemande : string;
    dateCreation : Date;
    phase: string;
    updateTime: string;
    arm : Armateur;
    agent : AgentParc;
    conteneur : Conteneur;
    transporteur : Transporteur;
}
