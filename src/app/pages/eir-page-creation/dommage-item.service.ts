import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DommageItem } from './dommage-item';

@Injectable({
  providedIn: 'root'
})
export class DommageItemService {

  url = environment.urlConfig + 'dommageItem';

  constructor(private http: HttpClient) { }

  async getAll(){
    return this.http.get<DommageItem[]>(this.url).toPromise();
  }
  async getDommageItemById(id: number){
    return this.http.get<DommageItem>(this.url+'/'+id).toPromise();
  }
  async addDommageItem(dommageItem: DommageItem, idDom:number, idEir:number){
    return this.http.post<DommageItem>(this.url+"/dommage/"+idDom+"/eir/"+idEir, dommageItem).toPromise();
  }
  async editDommageItem(dommageItem: DommageItem, idDom:number, idEir:number){
    return this.http.put<DommageItem>(this.url+"/dommage/"+idDom+"/eir/"+idEir, dommageItem).toPromise();
  }
  async deleteDommageItem(id: number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }
  async getAllByEirId(id: number){
    return this.http.get(this.url+'/eir/'+id).toPromise();
  }
}
