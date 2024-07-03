import { Routes } from '@angular/router';
import { PostsPageComponent } from './posts/posts-page.component';
import { CommentsPageComponent } from './comments/comments-page.component';
import { AlbumsPageComponent } from './albums/albums-page.component';
import { PhotosPageComponent } from './photos/photos-page.component';
import { TodosPageComponent } from './todos/todos-page.component';
import { UsersPageComponent } from './users/users-page.component';
import { MainPageComponent } from './main-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'posts', component: PostsPageComponent },
  { path: 'comments', component: CommentsPageComponent },
  { path: 'albums', component: AlbumsPageComponent },
  { path: 'photos', component: PhotosPageComponent },
  { path: 'todos', component: TodosPageComponent },
  { path: 'users', component: UsersPageComponent },
];
