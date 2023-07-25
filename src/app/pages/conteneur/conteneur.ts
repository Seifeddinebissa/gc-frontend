import { Armateur } from "../armateur/armateur";
import { Parc } from "../parc/parc";
import { TypeConteneur } from "../type-conteneur/type-conteneur";

export class Conteneur {
    id : number;
    couleur1 : string;
    couleur2 : string;
    taille: string;
    marquage : string;
    status : string;
    parc : Parc;
    conteneurType : TypeConteneur;
    armateur : Armateur;

}
