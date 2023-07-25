import { Dommage } from "../type-dommage/dommage";
import { Eir } from "./eir";

export class DommageItem {
    id: number;
    position: string;
    detail: string;
    longeur: number;
    largeur: number;
    unite: number;
    anciennete: string;
    dommageValue: string;
    phase: string;
    dommage: Dommage;
    eir: Eir;
}
