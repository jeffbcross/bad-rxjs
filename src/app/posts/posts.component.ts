import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  constructor(private post: PostService, private user: UserService) {}

  ngOnInit() {
    this.post
      .fetch()
      .subscribe(posts => {
        this.user.getUsersMap()
          .subscribe(users => {
            this.posts = posts.map(post => ({
              ...post,
              authorName: users[post.userId].name
            }));
        });
      });
  }
}

export interface PostWithAuthor extends Post {
  authorName: string;
}
