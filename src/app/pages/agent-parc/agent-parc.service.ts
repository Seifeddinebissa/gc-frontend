import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AgentParc } from './agent-parc';
import { EmailContent } from '../armateur/email-content';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgentParcService {
  url = environment.urlConfig+'agentParc';
  mailUrl = environment.urlConfig+'envoyerMail';

  constructor(private http : HttpClient) { }

  async getAll(){
    return this.http.get<AgentParc[]>(this.url).toPromise();
  }

  async deleteAgentParc(id :number){
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  async getById(id : number){
    return this.http.get<AgentParc>(this.url+'/'+id).toPromise();
  }

  async addAgentParc(agentParc : AgentParc, id:number){
    return this.http.post<AgentParc>(this.url+'/user/'+id,agentParc).toPromise();
  }

  async editAgentParc(agentParc : AgentParc, id:number){
    return this.http.put(this.url+'/user/'+id, agentParc).toPromise();
  }
  
  async getAgentByUserId(id : number){
    return this.http.get<AgentParc>(this.url+"/user/"+id).toPromise();
  }

  envoyerEmail(emailContent : EmailContent):Observable<any>{
    return this.http.post<EmailContent>(this.mailUrl,emailContent);
  }
  async getByEmail(email : string){
    return this.http.get<AgentParc>(this.url+'/email/'+email).toPromise();
  }
}
