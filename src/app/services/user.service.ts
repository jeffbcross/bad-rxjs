import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUser(id: number): Observable<User> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .map(res => res.json());
  }

  getUsersMap(): Observable<UsersMap> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .map(res => res.json())
      .map((users: User[]) => users
        .reduce((userMap, user) => {
          return {
            ...userMap,
            [user.id]: user
          };
        }, {}));
  }
}

export interface UsersMap {
  [key: string]: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
