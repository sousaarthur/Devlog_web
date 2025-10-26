import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private url = "http://localhost:8080/api/auth/"
  constructor( private http:HttpClient ){}

  login(data:any):Observable<any>{
    return this.http.post(this.url + "login", data);
  }
}
