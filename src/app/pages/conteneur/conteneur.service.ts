import { Conteneur } from './conteneur';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { LastDemandes } from '../demande/last-demandes';

@Injectable({
  providedIn: 'root'
})
export class ConteneurService {

  url = environment.urlConfig+'conteneur';

  constructor(private http : HttpClient) { }

  async getAll(){
    return this.http.get<Conteneur[]>(this.url).toPromise();
  }
  async getConteneurById(id : number){
    return this.http.get<Conteneur>(this.url+'/'+id).toPromise();
  }
  async addConteneur(conteneur : Conteneur,idArm: number, idTC: number){
    return this.http.post<Conteneur>(this.url+'/armateur/'+idArm+'/conteneurType/'+idTC,conteneur).toPromise();
  }
  async editConteneur(conteneur : Conteneur,idArm: number, idTC: number){
    return this.http.put<Conteneur>(this.url+'/armateur/'+idArm+'/conteneurType/'+idTC,conteneur).toPromise();
  }
  async deleteConteneur(id : number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }
  async findByArmateurId(id : number){
    return this.http.get<Conteneur[]>(this.url+'/armateur/'+id).toPromise();
  }
  async findByArmateurIdAndStatus(id:number, status:string){
    return this.http.get<Conteneur[]>(this.url+'/armateur/'+id+'/status/'+status).toPromise();
  }
  async findConteneurNotInDemande(){
    return this.http.get<LastDemandes[]>(this.url+'/notInDemande').toPromise();
  }
  async findByParcId(id : number){
    return this.http.get<Conteneur[]>(this.url+'/parc/'+id).toPromise();
  }
  async conteneurExist(marquage: string){
    return this.http.get<boolean>(this.url+'/exist/'+marquage).toPromise();
  }
  
}
