import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable } from 'rxjs';
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


  import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  // Faz o GET (ou POST) para obter o token
  fetchToken(): Observable<string> {
    return this.http.get<{ token: string }>('https://api.seusite.com/auth/token')
      .pipe(
        map(res => {
          const token = res.token;
          this.setToken(token);
          return token;
        })
      );
  }

  // Salva o token no BehaviorSubject (ou no localStorage, se quiser)
  setToken(token: string) {
    this.tokenSubject.next(token);
    // localStorage.setItem('jwt', token); // opcional
  }

  // Recupera o token atual
  getTokenValue(): string | null {
    return this.tokenSubject.value;
  }

  // Permite se inscrever para mudanças no token
  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}





  {
    "payload": {
      ": [
        {
          "startTime": 0,
          "annotation": {
            "speakerId": "spk_1",
            "speakerRole": "Operator",
            "text": "hello"
          }
        },
        {
          "startTime": 0,
          "annotation": {
            "speakerId": "spk_2",
            "speakerRole": "Cliente",
            "text": "hi"
          }
        }
      ]
    }
  }
  
