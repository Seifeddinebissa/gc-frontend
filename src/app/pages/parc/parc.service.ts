import { Parc } from './parc';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ParcService {
  url = environment.urlConfig+'parc';
  constructor(private http : HttpClient) { }
  async getAll(){
    return this.http.get<Parc[]>(this.url).toPromise();
  }
  
  async deleteParc(id :number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  async getById(id : number){
    return this.http.get<Parc>(this.url+'/'+id).toPromise();
  }

  async addParc(parc : Parc){
    return this.http.post<Parc>(this.url,parc).toPromise();
  }

  async editParc(parc : Parc){
    return this.http.put(this.url, parc).toPromise();
  }
}

