import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RecipeModel } from "./recipes.model";
import { Observable } from "rxjs";
import { recipesFeature } from "./recipes.reducer";
import { TileBaseModule } from "./tile-base.module";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
    selector: "app-single-recipe-page",
    standalone: true,
    imports: [TileBaseModule, MatProgressSpinner],
    template: `<ng-container *ngIf="recipeItem$ | async as recipe">
        <mat-card *ngIf="recipe; else loading">
            <img mat-card-image [src]="recipe.image" alt="{{ recipe.name }}" />
            <mat-card-title>{{ recipe.name }}</mat-card-title>
            <mat-card-content>
                <p class="description">{{ recipe.name }}</p>
                <div class="info">
                    <p>
                        <mat-icon>schedule</mat-icon>
                        <strong>Preparation Time:</strong>
                        {{ recipe.prepTimeMinutes }} mins
                    </p>
                    <p>
                        <mat-icon>schedule</mat-icon>
                        <strong>Cook Time:</strong>
                        {{ recipe.cookTimeMinutes }} mins
                    </p>
                    <p>
                        <mat-icon>restaurant_menu</mat-icon>
                        <strong>Servings:</strong> {{ recipe.servings }}
                    </p>
                    <p>
                        <mat-icon>star</mat-icon> <strong>Rating:</strong>
                        {{ recipe.rating }} ({{ recipe.reviewCount }} reviews)
                    </p>
                </div>
                <div class="section">
                    <h3>Ingredients:</h3>
                    <ul>
                        <li *ngFor="let ingredient of recipe.ingredients">
                            {{ ingredient }}
                        </li>
                    </ul>
                </div>
                <div class="section">
                    <h3>Instructions:</h3>
                    <ol>
                        <li *ngFor="let step of recipe.instructions">
                            {{ step }}
                        </li>
                    </ol>
                </div>
                <div class="additional-info">
                    <p><strong>Difficulty:</strong> {{ recipe.difficulty }}</p>
                    <p><strong>Cuisine:</strong> {{ recipe.cuisine }}</p>
                    <p>
                        <strong>Calories per Serving:</strong>
                        {{ recipe.caloriesPerServing }}
                    </p>
                    <p><strong>Tags:</strong> {{ recipe.tags.join(", ") }}</p>
                </div>
            </mat-card-content>
            <mat-card-actions>
                <button mat-raised-button color="primary" (click)="goBack()">
                    Back
                </button>
            </mat-card-actions>
        </mat-card>
        <ng-template #loading>
            <div class="loading">
                <mat-spinner></mat-spinner>
                <p>Loading...</p>
            </div>
        </ng-template>
    </ng-container> `,
    styles: [
        `
         mat-card {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}

mat-card-content p,
.mat-card-content ul,
.mat-card-content ol {
  margin: 10px 0;
}

mat-card-content .description {
  font-style: italic;
  color: #555;
}

mat-card-content .info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

mat-card-content .info p {
  display: flex;
  align-items: center;
  gap: 5px;
}

mat-card-content .section {
  margin-top: 20px;
}

mat-card-content .section h3 {
  margin-bottom: 10px;
  font-weight: bold;
}

mat-card-content .additional-info {
  margin-top: 20px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading p {
  margin-top: 10px;
}

mat-card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

        `,
    ],
})
export class SingleRecipePageComponent implements OnInit {
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    public recipeId: number | null = null;
    public recipeItem$: Observable<RecipeModel | undefined> = new Observable<
        RecipeModel | undefined
    >();

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = parseInt(params.get("id") || "", 10);
            // TODO Check post is exist in store
            if (isNaN(id) && id) {
                this.router.navigate(["error"]);
            } else {
                this.recipeId = id;
                this.recipeItem$ = this.store.select(
                    recipesFeature.selectById(id)
                );
                // this.store.dispatch(postsActions.getComments({ id }));

                this.recipeItem$.subscribe((post) => {
                    if (!post) {
                        // TODO add single post loading
                        this.router.navigate(["posts"]);
                    } else {
                        // this.comments$ = this.store.select(
                        //     postsFeature.selectCommentsById(post.id)
                        // );
                        // this.comments$.subscribe((comments) => {
                        //     if (!comments) {
                        //         this.store.dispatch(
                        //             postsActions.getComments({ id })
                        //         );
                        //     }
                        // });
                    }
                });
            }
        });
    }

    public goBack(): void {
        this.router.navigate(["/recipes"]);
    }
}
