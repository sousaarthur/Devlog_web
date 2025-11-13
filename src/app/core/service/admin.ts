import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interface/userInterface';

@Injectable({
  providedIn: 'root'
})
export class Admin {

  private url = "http://localhost:8080/api/admin";
  constructor(private http:HttpClient){ }

  getAllUsers(page:number, size:number): Observable<Page<UserInterface>> {
    let params = {
      page: page,
      size: size,
      sortBy: 'id',
    };
    return this.http.get<Page<UserInterface>>(`${this.url}/users`, { params });
  }

  disableOrActive(id: any): Observable<boolean>{
    return this.http.patch<boolean>(`${this.url}/user`, id)
  }

}
