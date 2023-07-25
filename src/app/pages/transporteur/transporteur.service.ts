import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transporteur } from './transporteur';
//import { EmailTransporteur } from './email-transporteur';


@Injectable({
  providedIn: 'root'
})
export class TransporteurService {

  url = environment.urlConfig+'transporteur';
  //mailUrl = environment.urlConfig+'envoyerMail';

  constructor(private http : HttpClient) {}

  async getAll(){
    return this.http.get<Transporteur[]>(this.url).toPromise();
  }

   async deleteTransporteur(id :number){
    return this.http.delete(this.url+'/'+id).toPromise();
  } 

  async getById(id : number){
    return this.http.get<Transporteur>(this.url+'/'+id).toPromise();
  }

  async addTransporteur(transporteur : Transporteur){
    return this.http.post<Transporteur>(this.url,transporteur).toPromise();
  }

  async editTransporteur(transporteur : Transporteur){
    return this.http.put(this.url, transporteur).toPromise();
  }

  /*envoyerEmail(mailTransporteur : EmailTransporteur):Observable<any>{
    return this.http.post<EmailTransporteur>(this.mailUrl,mailTransporteur);
  }*/
}
