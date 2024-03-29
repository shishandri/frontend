import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };
 
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    debugger;
    return this.http.post(environment.apiBaseUrl+ '/register',user,this.noAuthHeader);
  }
  newPassword(body:any): Observable<any> {
    debugger;
    return this.http.post(`${environment.apiBaseUrl}/new-password/:token`, body);
  }

  requestReset(body:any): Observable<any> {
    debugger;
    return this.http.post(`${environment.apiBaseUrl}/req-reset-password`, body);
  }
 
  login(authCredentials:any) {
    debugger;
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() 

  {
    debugger;
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  

  forgotPassword(email: string) {
    debugger;
    return this.http.post(environment.apiBaseUrl + '/authenticate', { email });
}

  setToken(token: string) {
    debugger;
    localStorage.setItem('token', token);
  }

  getToken() {
      debugger;
    return localStorage.getItem('token');
  }

  deleteToken() {
    debugger;
    localStorage.removeItem('token');
  }

  getUserPayload() {
    debugger;
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
      debugger;
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  
}