import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserInterface } from '../interface/userInterface';
import { ChangePassInterface } from '../interface/changePassInterface';

@Injectable({
  providedIn: 'root'
})
export class User {
  private userSubject = new BehaviorSubject<UserInterface | null>(null);
  user$ = this.userSubject.asObservable();
  
  private url = "http://localhost:8080/api/user"
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  update(user: UserInterface): Observable<UserInterface> {
    return this.http.put(this.url, user).pipe(
      tap(updatedUser => this.userSubject.next(updatedUser))
    );
  }

  delete():Observable<any> {
    return this.http.delete(this.url);
  }

  changePassword(passwords: ChangePassInterface){
    return this.http.post(`${this.url}/changePassword`, passwords);
  }
}
