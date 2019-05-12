import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserListResult {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoints = {
    users: (page: number) => `${environment.API_URL}/?page=${page}`,
    user: (id: number) => `${environment.API_URL}/${id}/`
  };

  constructor(private http: HttpClient) {}

  public getUsers(page = 1): Observable<UserListResult> {
    return this.http.get<UserListResult>(this.endpoints.users(page));
  }

  public getUser(id: number): Observable<UserListResult> {
    return this.http.get<UserListResult>(this.endpoints.user(id));
  }

}