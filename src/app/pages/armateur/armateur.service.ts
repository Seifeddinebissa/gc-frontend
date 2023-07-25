import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Armateur } from './armateur';
import { EmailContent } from './email-content';

@Injectable({
  providedIn: 'root'
})
export class ArmateurService {

  url = environment.urlConfig+'armateur';
  mailUrl = environment.urlConfig+'envoyerMail';

  constructor(private http : HttpClient) {}

  async getAll(){
    return this.http.get<Armateur[]>(this.url).toPromise();
  }

  async deleteArmateur(id :number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  async getById(id : number){
    return this.http.get<Armateur>(this.url+'/'+id).toPromise();
  }

  async addArmateur(armateur : Armateur, idUser : number){
    return this.http.post<Armateur>(this.url+"/user/"+idUser,armateur).toPromise();
  }

  async editArmateur(armateur : Armateur, idUser : number){
    return this.http.put(this.url+"/user/"+idUser, armateur).toPromise();
  }

  envoyerEmail(emailContent : EmailContent):Observable<any>{
    return this.http.post<EmailContent>(this.mailUrl,emailContent);
  }

  async getArmateurByUserId(id : number){
    return this.http.get<Armateur>(this.url+'/byUserId/'+id).toPromise();
  }
  async getByEmail(email : string){
    return this.http.get<Armateur>(this.url+'/email/'+email).toPromise();
  }
}
