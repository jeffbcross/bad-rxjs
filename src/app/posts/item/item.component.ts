import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../../post.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  prevId: number = null;
  nextId: number = null;
  post: Post;
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    console.log('id', this.route.snapshot.paramMap);
    this.postService.fetch().subscribe(posts => {
      const index = posts.findIndex(post => post.id === id);
      this.post = posts[index];
      console.log('post', this.post, index, posts);
      if (index > 0) {
        this.prevId = posts[index - 1].id;
      } else {
        this.prevId = null;
      }

      if (index < posts.length - 1) {
        this.nextId = posts[index + 1].id;
      } else {
        this.nextId = null;
      }
    });
  }
}
