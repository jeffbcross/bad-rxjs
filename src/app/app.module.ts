import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ItemComponent } from './posts/item/item.component';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([{
      path: '',
      pathMatch: 'full',
      redirectTo: 'posts'
    }, {
      path: 'posts',
      pathMatch: 'full',
      component: PostsComponent
    }/*, {
      path: 'posts/:id',
      component: PostDetail
    }*/])
  ],
  providers: [PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
