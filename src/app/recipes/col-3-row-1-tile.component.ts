import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { TileDetailsComponent } from "./tile-details.component";
import { JsonPipe } from "@angular/common";

@Component({
    selector: "app-3-1-tile",
    standalone: true,
    host: {
        "(click)": "focusActiveOption()",
    },
    imports: [
        MatCardModule,
        MatRippleModule,
        MatButtonModule,
        TileDetailsComponent,
        JsonPipe
    ],
    template: `
        <mat-card matRipple class="card" appearance="outlined">
            <mat-card-content class="mat-card-content-basic">
                <div class="picture child child-basic">
                    <img
                        mat-card-image
                        [src]="recipe().image"
                        alt="{{ recipe().name }}"
                    />
                </div>
                <div class="details child child-basic">
                    <app-tile-details [recipe]="recipe()" />
                </div>
                <div class="extra-info child child-basic">
                    <p>For {{ recipe().servings }} servings</p>
                    <p>Cuisine: {{ recipe().cuisine }}</p>
                    <p>Calories: {{ recipe().caloriesPerServing }}</p>
                    <p>Tags: {{ recipe().tags | json }}</p>
                </div>
            </mat-card-content>
        </mat-card>
    `,
    styleUrl: "./tile.base.scss",
    styles: [
        `
            .child {
                flex: 1 1 33.33%; /* Flex-grow, flex-shrink, and flex-basis to set the width to 33.33% */
                box-sizing: border-box; /* Include padding and border in the element's total width and height */
            }

            mat-card-content {
                flex-direction: row;
            }
        `,
    ],
})
export class Col3Row1TileComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();

    public focusActiveOption(): void {
        console.log("sdf");
    }
}
