import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';

import {UserService} from './user.service';


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithAuthor extends Post {
  authorName: string;
}

@Injectable()
export class PostService {

  constructor(private http: Http, private user:UserService) {}

  fetch(): Observable<Post[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
      .map(res => res.json());
  }

  loadPosts() : Observable<Array<PostWithAuthor>> {
    const rawPosts$ = this.fetch();
    const loadFullPostFn = post => {
      return this.user
                 .getUser(post.userId)
                 .map( user => ({...post, authorName:user.name}) );
    };

    return rawPosts$.mergeMap( posts => {
      const collection$ = posts.map(loadFullPostFn);        // Array<Observables<PostWithAuthor>>
      const fullPosts$  = Observable.forkJoin(collection$); // Observable<Array<PostWithAuthor>>

      // 1st show raw posts, then later show the full posts
      // NOTE: use 1-sec delay to show raw posts onscreen
      return Observable.of(posts).merge(fullPosts$.delay(1000));
    });

  }
}


