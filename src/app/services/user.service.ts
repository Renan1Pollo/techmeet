import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Event } from '../types/Event.type';
import { User } from '../types/User.type';
import { LoginRequest } from '../types/Login.type';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(data: LoginRequest): Observable<any>{
    return this.http.post<User>(env.apiRegisterUrl, data);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post<LoginRequest>(env.apiLoginUrl, data);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(env.apiUserUrl);
  }
}
