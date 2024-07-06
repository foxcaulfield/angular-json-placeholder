import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";

@Component({
    selector: "app-1-1-tile",
    standalone: true,
    imports: [MatCardModule, MatRippleModule],
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
            }

            mat-card-content {
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: column;
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
                border-radius: 4px;
                object-fit: cover; /* This ensures the image covers the parent properly */
                border-radius: inherit; /* Inherits the parent's border-radius */
            }
        `,
    ],
})
export class Col1Row1TileComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
}
