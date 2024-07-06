import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { TileDetailsComponent } from "./tile-details.component";

@Component({
    selector: "app-1-2-tile",
    standalone: true,
    imports: [
        MatCardModule,
        MatRippleModule,
        TileDetailsComponent
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
            </mat-card-content>
        </mat-card>
    `,
    styleUrl: "./tile.base.scss",
    styles: [
        `
            .child {
                flex: 1 1 50%; /* Flex-grow, flex-shrink, and flex-basis to set the width to 50% */
                box-sizing: border-box; /* Include padding and border in the element's total width and height */
            }

            mat-card-content {
                flex-direction: column;
            }
        `,
    ],
})
export class Col1Row2TileComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
}
