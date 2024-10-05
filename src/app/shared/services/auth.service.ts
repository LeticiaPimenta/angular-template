import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9000';

  constructor(
    private http:HttpClient
  ) { }

  login(email:string, password:string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/login`, {email,password});
  }
}
