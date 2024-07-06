import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-3-1-tile",
    standalone: true,

    imports: [MatCardModule, MatRippleModule, MatButtonModule],
    template: `
        <mat-card matRipple class="card">
            <mat-card-content>
                <div class="picture child">
                    <img
                        mat-card-image
                        [src]="recipe().image"
                        alt="{{ recipe().name }}"
                    />
                </div>
                <div class="details child">
                    <h5>
                        <strong>{{ recipe().name }}</strong>
                    </h5>
                    <p>{{ recipe().cookTimeMinutes }} mins</p>
                    <p>{{ recipe().servings }} servings</p>
                </div>
                <div class="extra-info child">
                    <p>{{ recipe().difficulty }}</p>
                    <p>
                        {{ recipe().rating }} ({{ recipe().reviewCount }}
                        reviews)
                    </p>
                </div>
            </mat-card-content>
        </mat-card>
    `,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                width: 100%;
            }

            .card {
                height: 100%;
                width: 100%;
                border: 1px solid white;
            }

            .child {
                height: 100%;
                width: 100%;
                flex: 1 1 33.33%; /* Flex-grow, flex-shrink, and flex-basis to set the width to 33.33% */
                box-sizing: border-box; /* Include padding and border in the element's total width and height */
            }

            mat-card-content {
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: row;
                padding: 0px !important;
            }
            .picture {
                min-height: 50%;
                overflow: hidden;
                border-radius: var(--mdc-elevated-card-container-shape);
                overflow: hidden;
            }
            .picture img {
                max-width: 100%;
                // max-height: 100%;
                object-fit: cover; /* This ensures the image covers the parent properly */
                border-radius: inherit; /* Inherits the parent's border-radius */
            }
        `,
    ],
})
export class Col3Row1TileComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
}
