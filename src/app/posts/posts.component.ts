import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post.service';
import { UserService } from '../user.service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: PostWithAuthor[];
  constructor(private post: PostService, private user: UserService) {}

  ngOnInit() {
    const rawPosts$ = this.post.fetch();

    rawPosts$.subscribe(posts => {
      // Note: posts$ is a [ Observable<PostWithAuthor> ]
      const posts$ : Array<Observable<PostWithAuthor>> = posts.map(post => {
        return this.user
                   .getUser(post.userId)
                   .map( user => ({...post, authorName: user.name}));
      });

      Observable.forkJoin(posts$).subscribe(list => {
        // Assign to update template using *ngFor
        this.posts = list
      });
    });

  }
}

export interface PostWithAuthor extends Post {
  authorName: string;
}
