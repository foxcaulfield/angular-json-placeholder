import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TileDetailsComponent } from "./tile-details.component";
import { JsonPipe } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";

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
        MatIconModule,
        MatChipsModule,
        TileDetailsComponent,
        JsonPipe,
        MatProgressBarModule
    ],
    template: `
        <mat-card matRipple class="card" appearance="outlined" [@cardHover]="hoverState" (mouseenter)="hoverState='hover'" (mouseleave)="hoverState='normal'">
            <!-- <mat-card-header>
                <mat-icon>kitchen</mat-icon>
                <mat-card-title>{{ recipe().name }}</mat-card-title>
                <mat-card-subtitle>{{ recipe().cuisine }}</mat-card-subtitle>
            </mat-card-header> -->
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
                <button mat-button color="primary">Cook Now</button>
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
    animations: [
        trigger('cardHover', [
            state('normal', style({
                transform: 'scale(1)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            })),
            state('hover', style({
                transform: 'scale(1)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
            })),
            transition('normal <=> hover', [
                animate('300ms ease-in-out')
            ])
        ])
    ]
})
export class Col3Row1TileComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
    public hoverState: 'normal' | 'hover' = 'normal';

    public focusActiveOption(): void {
        console.log("Option focused!");
    }
}
