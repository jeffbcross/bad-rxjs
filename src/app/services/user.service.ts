import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private cache: Map<number, Observable<User>> = new Map();

  getUser(id: number): Observable<User> {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    const obs$ = this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .map(res => res.json() as User)
      .shareReplay()
    ;

    this.cache.set(id, obs$);

    return obs$;
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
