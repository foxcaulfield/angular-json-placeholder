import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";

@Component({
    selector: "app-tile-details",
    standalone: true,
    imports: [],
    template: `
        <div class="wrapper">
            <h5>
                <strong>{{ recipe().name }}</strong>
            </h5>
            <p>
                <strong>Cook Time:</strong>
                {{ recipe().cookTimeMinutes }} mins
            </p>
            <!-- <p><strong>Servings:</strong> {{ recipe().recipe.servings }}</p> -->
            <p><strong>Difficulty:</strong> {{ recipe().difficulty }}</p>
            <p>
                <strong>Rating:</strong> {{ recipe().rating }} ({{
                    recipe().reviewCount
                }}
                reviews)
            </p>
        </div>
    `,
    styles: [
        `
            .wrapper {
                padding: 20px;
            }
        `,
    ],
})
export class TileDetailsComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
}
