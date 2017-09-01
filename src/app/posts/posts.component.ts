import { Component } from '@angular/core';
import { PostService, PostWithAuthor } from '../services/post.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts$: Observable<Array<PostWithAuthor>> = this.service.posts$;
  constructor(private service: PostService) {}
}


