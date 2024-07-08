import { Routes } from '@angular/router';
import { PostsPageComponent } from './posts/posts-page.component';
import { UsersPageComponent } from './users/users-page.component';
import { MainPageComponent } from './main-page.component';
import { ErrorPageComponent } from './common/error-page.component';
import { SinglePostPageComponent } from './posts/single-post-page.component';
import { NotFoundComponent } from './common/not-found.component';
import { RecipesPageComponent } from './recipes/recipes-page.component';
import { SingleRecipePageComponent } from './recipes/single-recipe-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'posts', component: PostsPageComponent },
  { path: 'posts/:id', component: SinglePostPageComponent }, // Add this route for posts with ID
  { path: 'recipes', component: RecipesPageComponent },
  { path: 'recipes/:id', component: SingleRecipePageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', component: NotFoundComponent } // Wildcard route for handling 404 errors
];
