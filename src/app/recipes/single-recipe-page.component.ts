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
    template: `
        <div class="progress-bar-container">
            @if (isLoading$ | async) {
            <mat-progress-bar mode="query"></mat-progress-bar>
            }
        </div>
        <div class="container">
            <button mat-stroked-button color="primary" (click)="goBack()">
                Back to Recipes
            </button>
            @if (recipeItem$ | async; as recipe) {
            <mat-card>
                <img
                    mat-card-image
                    [src]="recipe.image"
                    alt="{{ recipe.name }}"
                />
                <mat-card-title>{{ recipe.name }}</mat-card-title>
                <mat-card-content>
                    <!-- <p class="description">{{ recipe.name }}</p> -->
                    <p class="description"></p>
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
                            {{ recipe.rating }} ({{ recipe.reviewCount }}
                            reviews)
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
                        <p>
                            <strong>Difficulty:</strong> {{ recipe.difficulty }}
                        </p>
                        <p><strong>Cuisine:</strong> {{ recipe.cuisine }}</p>
                        <p>
                            <strong>Calories per Serving:</strong>
                            {{ recipe.caloriesPerServing }}
                        </p>
                        <p>
                            <strong>Tags:</strong> {{ recipe.tags.join(", ") }}
                        </p>
                    </div>
                </mat-card-content>
                <mat-card-actions>
                    <button
                        mat-raised-button
                        color="primary"
                        (click)="goBack()"
                    >
                        Back
                    </button>
                </mat-card-actions>
            </mat-card>
            } @else {
            <div class="no-recipe-container">
                <mat-icon color="warn" class="no-recipe-icon">info</mat-icon>
                <p class="no-recipe-message">No recipe with such ID.</p>
            </div>
            }
        </div>
    `,
    styles: [
        `
            .progress-bar-container {
                height: 4px; /* Adjust this to match the height of your progress bar */
            }

            .container {
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 16px;
            }

            mat-card {
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #3c3c3c;
                border-radius: 10px;
            }

            mat-card-content p {
                margin: 0;
                font-size: 14px;
            }

            .description {
                font-style: italic;
                color: #555;
                height: 16px;
            }

            .info {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
            }

            .info p {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .section {
                margin-top: 20px;
            }

            .section h3 {
                margin-bottom: 10px;
                font-weight: bold;
            }

            .additional-info {
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

            .no-recipe-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                padding: 16px;
                text-align: center;
            }

            .no-recipe-message {
                font-size: 18px;
                color: #757575; /* Grey color */
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
    public isLoading$: Observable<boolean> = this.store.select(
        recipesFeature.selectIsLoading
    );

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = parseInt(params.get("id") || "", 10);
            // TODO Check recipe is exist in store
            if (isNaN(id) && id) {
                this.router.navigate(["error"]);
            } else {
                this.recipeId = id;
                this.recipeItem$ = this.store.select(
                    recipesFeature.selectById(id)
                );
                // this.store.dispatch(recipesActions.getComments({ id }));

                this.recipeItem$.subscribe((recipe) => {
                    if (!recipe) {
                        // TODO add single recipe loading
                        // this.router.navigate(["recipes"]);
                    } 
                });
            }
        });
    }

    public goBack(): void {
        this.router.navigate(["/recipes"]);
    }
}
