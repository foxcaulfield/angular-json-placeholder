import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";

@Component({
    selector: "app-1-1-tile",
    standalone: true,
    imports: [MatCardModule, MatRippleModule],
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
            </mat-card-content>
        </mat-card>
    `,
    styleUrl: "./tile.base.scss",
    styles: [
        `
            mat-card-content {
                flex-direction: column;
            }
        `,
    ],
})
export class Col1Row1TileComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
}
