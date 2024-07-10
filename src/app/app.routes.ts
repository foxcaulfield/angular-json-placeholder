import { Routes } from "@angular/router";
import { PostsPageComponent } from "./posts/posts-page.component";
import { UsersPageComponent } from "./users/users-page.component";
import { MainPageComponent } from "./main-page.component";
import { ErrorPageComponent } from "./common/error-page.component";
import { SinglePostPageComponent } from "./posts/single-post-page.component";
import { NotFoundComponent } from "./common/not-found.component";
import { RecipesPageComponent } from "./recipes/recipes-page.component";
import { SingleRecipePageComponent } from "./recipes/single-recipe-page.component";
import { LoginPageComponent } from "./auth/login-page.component";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
    { path: "", component: MainPageComponent },
    { path: "posts", component: PostsPageComponent },
    { path: "posts/:id", component: SinglePostPageComponent }, // Add this route for posts with ID
    {
        path: "recipes",
        component: RecipesPageComponent,
        canActivate: [authGuard],
    },
    {
        path: "recipes/:id",
        component: SingleRecipePageComponent,
        canActivate: [authGuard],
    },
    { path: "users", component: UsersPageComponent },
    { path: "login", component: LoginPageComponent },
    { path: "error", component: ErrorPageComponent },

    { path: "**", component: NotFoundComponent }, // Wildcard route for handling 404 errors
];
