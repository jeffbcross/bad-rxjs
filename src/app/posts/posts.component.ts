import { Component } from '@angular/core';
import { PostService, Post } from '../post.service';
import { UserService } from '../user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {y
  posts$: Observable<Array<PostWithAuthor>> = this.loadPosts();

  constructor(private post: PostService, private user: UserService) {}

  protected loadPosts() : Observable<Array<PostWithAuthor>> {
    const rawPosts$ = this.post.fetch();
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

export interface PostWithAuthor extends Post {
  authorName: string;
}
