import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eir } from './eir';

@Injectable({
  providedIn: 'root'
})
export class EirService {
  url = environment.urlConfig+'eir';

  constructor(private http : HttpClient) { }

  async getAll(){
    return this.http.get<Eir[]>(this.url).toPromise();
  }

  async getById(id : number){
    return this.http.get<Eir>(this.url+'/'+id).toPromise();
  }

  async addEir(eir : Eir , idD :number){
    return this.http.post<Eir>(this.url+'/demande/'+idD,eir).toPromise();
  }

  async deleteEir(id :number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }
  
  async editEir(eir : Eir , idD :number){
    return this.http.put<Eir>(this.url+'/demande/'+idD,eir).toPromise();
  }

  async countAll()
  {return this.http.get(this.url + '/countAll/').toPromise();}


  async getByDemandeId(id : number){
    return this.http.get<Eir>(this.url+'/demande/'+id).toPromise();
  }

  async countByAgent(id : number)
  { return this.http.get<number>(this.url + '/countByAgent/' + id).toPromise();}

  async countByArmateur(id : number)
  { return this.http.get<number>(this.url + '/countByArmateur/' + id).toPromise();}
  

}
