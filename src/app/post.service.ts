import {Inject, Injectable, InjectionToken} from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';

import {UserService} from './user.service';
import {POST_ENDPOINT_TOKEN} from './post.provider';


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

  // Get all available posts WITH the authorNames
  //
  // NOTE: this only configures the request pipeline
  //       Some external observer must subscribe to trigger the call.
  //       The `async` pipe performs the `.subscribe()`/`.unsubscribe()`

  posts$ = this.http.get(this.allPostsUrl)
      .map(res => res.json())
      .mergeMap(posts=>{
        return Observable.of(posts)
            .merge(Observable.forkJoin(posts
                .map(post=>this.user.getUser(post.userId)
                    .map(user=>({...post,  authorName:user.name })))));
      });

  constructor(
      private http: Http,
      private user:UserService,
      @Inject(POST_ENDPOINT_TOKEN) private allPostsUrl:string) {
  }
}


