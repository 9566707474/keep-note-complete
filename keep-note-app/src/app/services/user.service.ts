import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  apiUrl: string;
  user: User;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.apiUrl = 'http://localhost:8084/api/user';
  }

  fetchUserFromServer(): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/' + this.authService.getUserId(), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  editCategory(user: User): Observable<User> {
    return this.httpClient.put<User>(this.apiUrl + '/' + user.userId, user, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }
}