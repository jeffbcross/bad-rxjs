import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PostService, PostWithAuthor} from '../../services/post.service';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent  {
  prevId: number = null;
  nextId: number = null;

  post$: Observable<PostWithAuthor> = this.route.paramMap
           .map(params=>parseInt(params.get('id'), 10))
           .mergeMap((id:number)=>{
             return this.postService.posts$
                 .do(posts=>this.updateNavigation(posts, id))
                 .map((posts:PostWithAuthor[]) => {
                   return posts[posts.findIndex(post => post.id === id)];
                 })
           });

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  updateNavigation(posts, id) {
    const index = posts.findIndex(post => post.id === id)
    this.prevId = index > 0 ? posts[index - 1].id : null;
    this.nextId = index < posts.length - 1 ? posts[index + 1].id : null;
  }

}
