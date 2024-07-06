import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-3-1-tile",
    standalone: true,

    imports: [MatCardModule],
    template: `
        <mat-card class="card">
            <mat-card-title>{{ recipe().name }}</mat-card-title>
            <mat-card-content>
                <p>{{ recipe().userId }}</p>
            </mat-card-content>
        </mat-card>
    `,
    styles: [
        `
           :host, .card {
                height: 100%;
                width: 100%;
            }
            .card {
                background-color: lightblue;
            }
            mat-card {
                padding: 20px;
            }
        `,
    ],
})
export class Col3Row1TileComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
}
