import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Personnel } from './models/personnel.model';

@Injectable()
export class UserService {
  private url = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Array<Personnel>>(this.url);
  }

  createUser(user: Personnel) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Personnel>(this.url, JSON.stringify(user), {
      headers: myHeaders,
    });
  }
  updateUser(user: Personnel) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Personnel>(this.url, JSON.stringify(user), {
      headers: myHeaders,
    });
  }
  deleteUser(id: string) {
    return this.http.delete<Personnel>(this.url + '/' + id);
  }
}
