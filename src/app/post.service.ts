import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  constructor(private http: Http) {}

  fetch(): Observable<Post[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
      .map(res => res.json());
  }
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
