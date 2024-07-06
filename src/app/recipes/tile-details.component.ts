import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-tile-details",
    standalone: true,
    imports: [MatIconModule],
    template: `
        <div class="wrapper">
            <h5>
                <strong>{{ recipe().name }}</strong>
            </h5>
            <p>
                <mat-icon>access_time</mat-icon> {{ recipe().cookTimeMinutes }} mins
            </p>
            <p>
                <mat-icon>fitness_center</mat-icon> {{ recipe().difficulty }}
            </p>
            <p>
                <mat-icon>star</mat-icon> {{ recipe().rating }} ({{ recipe().reviewCount }} reviews)
            </p>
        </div>
    `,
    styles: [
        `
            .wrapper {
                padding: 20px;
            }

            mat-icon {
                vertical-align: middle;
                margin-right: 5px;
            }
        `,
    ],
})
export class TileDetailsComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
}
