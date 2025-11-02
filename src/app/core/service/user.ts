import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserInterface } from '../interface/userInterface';

@Injectable({
  providedIn: 'root'
})
export class User {
  private userSubject = new BehaviorSubject<UserInterface | null>(null);
  user$ = this.userSubject.asObservable();
  
  private url = "http://localhost:8080/api/user"
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url);
  }

  update(user: UserInterface): Observable<UserInterface> {
    return this.http.put(this.url, user);
  }
}
