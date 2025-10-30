import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInterface } from '../../features/auth/login/login-interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private url = "http://localhost:8080/api/auth/"
  constructor( private http:HttpClient ){}

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

  login(data:LoginInterface):Observable<any>{
    return this.http.post(this.url + "login", data);
  }
}
