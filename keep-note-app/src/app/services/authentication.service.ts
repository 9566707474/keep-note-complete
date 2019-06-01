import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private authUrl: string;
  constructor(private httpClient: HttpClient) {
    this.authUrl = 'http://localhost:8085/api/auth/';
  }

  authenticateUser(data: any) {
    return this.httpClient.post(this.authUrl + 'login', data);
  }

  registerUser(data: any) {
    return this.httpClient.post(this.authUrl + 'register', data);
  }

  setUserId(userId: string) {
    localStorage.setItem('user', userId);
  }

  getUserId() {
    return localStorage.getItem('user');
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<any> {
    return this.httpClient.post(this.authUrl + 'isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(map(reponse => reponse['isAuthenticated'])).toPromise();
  }

  logout() {
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('user');
  }
}
