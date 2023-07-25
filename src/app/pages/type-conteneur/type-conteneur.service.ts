import { TypeConteneur } from './type-conteneur';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class TypeConteneurService {

  url = environment.urlConfig+'conteneurType';

  constructor(private http : HttpClient) { }

  async getAll(){
    return this.http.get<TypeConteneur[]>(this.url).toPromise();
  }
  
  async deleteTypeConteneur(id : number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  async updateTypeConteneur(typeContenur : TypeConteneur){
    return this.http.put<TypeConteneur>(this.url, typeContenur).toPromise();
  }

  async addTypeConteneur(typeConteneur : TypeConteneur){
    return this.http.post<TypeConteneur>(this.url,typeConteneur).toPromise();
  }

  async getTypeConteneurById(id : number){
    return this.http.get<TypeConteneur>(this.url+'/'+id).toPromise();
  }
}
