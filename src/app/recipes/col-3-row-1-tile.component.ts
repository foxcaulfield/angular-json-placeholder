import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TileDetailsComponent } from "./tile-details.component";
import { JsonPipe } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { TileBaseComponent } from "./tile-base.component";

@Component({
    selector: "app-3-1-tile",
    standalone: true,

    imports: [
        MatCardModule,
        MatRippleModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatProgressBarModule,
        TileDetailsComponent,
        JsonPipe,
        MatChipsModule,
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
            <mat-card-actions>
                <button
                    mat-button
                    color="primary"
                    matTooltip="Click to start cooking!"
                >
                    Cook Now
                </button>
            </mat-card-actions>
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
        `,
    ],
})
export class Col3Row1TileComponent extends TileBaseComponent {}
