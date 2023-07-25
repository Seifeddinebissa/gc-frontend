import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PagesComponent } from '../pages.component';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = PagesComponent.urlConfig + 'user'
  constructor(protected httpclient: HttpClient) { }

  async getById(id: Number) {
    let user = this.httpclient.get<User>(this.url + '/' + id).toPromise();
    return user
  }

  async getAll() {
    let users = this.httpclient.get<User[]>(this.url).toPromise();
    return users
  }

  async addUser(user: User) {
    return this.httpclient.post(this.url, user).toPromise();
  }

  async editUser(user: User) {
    return this.httpclient.put(this.url + '/' + user.id, user).toPromise();
  }

  async deleteUser(id: number) {
    return this.httpclient.delete(this.url + '/' + id).toPromise();
  }

  async getByPseudo(pseudo: string) {
    let user = this.httpclient.get<User>(this.url + '/pseudo/' + pseudo).toPromise();
    if(await user != null)
    return user
  }


  async getByPseudoNotEncrypt(pseudo: string) {
    return this.httpclient.get<User>(this.url + '/pseudo/' + pseudo).toPromise();
  }

  async getByIdNotEncrypt(id: Number) {
    return this.httpclient.get<User>(this.url + '/' + id).toPromise();
  }

  async getAllNotEncrypt() {
    return this.httpclient.get<User[]>(this.url).toPromise();
  }

  async addUserNotEncrypt(user: User) {
    return this.httpclient.post(this.url, user).toPromise();
  }

  async editUserEncrypt(user: User) {
    return this.httpclient.put(this.url + '/' + user.id, user).toPromise();
  }

}