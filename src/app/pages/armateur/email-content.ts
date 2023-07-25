export class EmailContent {
    to : string;
    pseudo : string;
    mdp : string;

    constructor(to:string,pseudo:string,mdp:string){
        this.to = to;
        this.pseudo = pseudo;
        this.mdp = mdp;
    }
}
