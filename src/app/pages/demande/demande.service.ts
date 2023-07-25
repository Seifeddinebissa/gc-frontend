import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Demande } from './demande';
import { LastDemandes } from './last-demandes';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  url = environment.urlConfig+"demande";

  constructor(private http : HttpClient) { }

  async getAll(){
    return this.http.get<Demande[]>(this.url).toPromise();
  }

  async getDemandeById(id:number){
    return this.http.get<Demande>(this.url+'/'+id).toPromise();
  }

  async addDemande(demande:Demande, idCtr:number, idArm:number, idTr: number){
    return this.http.post<Demande>(this.url+'/conteneur/'+idCtr+'/armateur/'+idArm+'/transporteur/'+idTr,demande).toPromise();
  }

  async editDemande(demande:Demande, idCtr:number, idArm:number, idAg:number, idTr: number){
    return this.http.put<Demande>(this.url+'/conteneur/'+idCtr+'/armateur/'+idArm+'/agent/'+idAg+'/transporteur/'+idTr,demande).toPromise();
  }

  async deleteDemande(id:number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  async getByArmateurId(id:number){
    return this.http.get<Demande>(this.url+'/ByArmateurId/'+id).toPromise();
  }

  async getByAgentParcId(id:number){
    return this.http.get<Demande>(this.url+'/ByAgentId/'+id).toPromise();
  }

  async getByDateCreation(date:string){
    return this.http.get<Demande>(this.url+'/dateCreation/'+date).toPromise();
  }

  async findLastDemandeTraite(){
    return this.http.get<LastDemandes[]>(this.url+'/lastDemande/traite').toPromise();
  }

  async getByDateModification(date: string){
    return this.http.get<Demande[]>(this.url+'/dateModification/'+date).toPromise();
  }
}
