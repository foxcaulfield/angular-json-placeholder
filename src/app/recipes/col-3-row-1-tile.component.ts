import { Component } from "@angular/core";
import { TileBaseComponent } from "./tile-base.component";
import { TileBaseModule } from "./tile-base.module";

@Component({
    selector: "app-3-1-tile",
    standalone: true,
    imports: [TileBaseModule],
    template: `
        <mat-card matRipple class="card" appearance="outlined">
            <mat-card-content class="mat-card-content-basic">
                <div class="picture child child-basic">
                    <img
                        mat-card-image
                        [src]="recipe().image"
                        alt="{{ recipe().name }}"
                    />
                    <button
                    class="cook-now-button"
                    mat-mini-fab
                    color="primary"
                    matTooltip="Click to start cooking!"
                >
                    <mat-icon>restaurant_menu</mat-icon>
                </button>
                </div>
                <div class="details child child-basic">
                    <app-tile-details [recipe]="recipe()" />
                </div>
                <div class="extra-info child child-basic">
                    <p matTooltip="Number of servings this recipe makes">
                        <mat-icon>restaurant</mat-icon>
                        For {{ recipe().servings }} servings
                    </p>
                    <p>
                        <mat-icon>local_fire_department</mat-icon>
                        Calories: {{ recipe().caloriesPerServing }}
                    </p>
                    <!-- <mat-progress-bar mode="determinate" [value]="recipe().caloriesPerServing / 2000 * 100"></mat-progress-bar> -->
                    <p>
                        <mat-icon>label</mat-icon>
                        Tags:
                        <mat-chip-listbox>
                            @for (tag of recipe().tags; track $index) {
                            <mat-chip>{{ tag }}</mat-chip>
                            }
                        </mat-chip-listbox>
                    </p>
                </div>
            </mat-card-content>
        </mat-card>
    `,
    styleUrls: ["./tile.base.scss"],
    styles: [
        `
            .child {
                flex: 1 1 33.33%;
                box-sizing: border-box;
            }

            mat-card-content {
                flex-direction: row;
            }
            .cook-now-button {
                position: sticky;
                left: 2%;
                bottom: 2%;
                z-index: 100;   
            }
        `,
    ],
})
export class Col3Row1TileComponent extends TileBaseComponent {}
