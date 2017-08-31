import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: PostWithAuthor[];
  constructor(private post: PostService, private user: UserService) {}

  ngOnInit() {
    this.post
      .fetch()
      .subscribe(posts => {
        Observable.forkJoin(posts
            .map(post => this.user.getUser(post.userId)
              .map(user => ({...post, authorName: user.name}))))
          .subscribe(postsWithAuthor => {
            this.posts = postsWithAuthor;
          });
      });
  }
}

export interface PostWithAuthor extends Post {
  authorName: string;
}
