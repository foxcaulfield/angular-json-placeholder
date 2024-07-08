import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from "@angular/animations";
import { TileDetailsComponent } from "./tile-details.component";
import { TileBaseComponent } from "./tile-base.component";

@Component({
    selector: "app-1-2-tile",
    standalone: true,
    imports: [
        MatCardModule,
        MatRippleModule,
        MatIconModule,
        TileDetailsComponent,
    ],
    template: `
        <mat-card
            matRipple
            class="card"
            appearance="outlined"
            [@cardHover]="hoverState"
            (mouseenter)="hoverState = 'hover'"
            (mouseleave)="hoverState = 'normal'"
        >
            <!-- <mat-card-header>
                <mat-icon>local_dining</mat-icon>
                <mat-card-title>{{ recipe().name }}</mat-card-title>
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
            </mat-card-content>
        </mat-card>
    `,
    styleUrls: ["./tile.base.scss"],
    styles: [
        `
            .child {
                flex: 1 1 50%;
                box-sizing: border-box;
            }

            mat-card-content {
                flex-direction: column;
            }
        `,
    ],
    animations: [
        trigger("cardHover", [
            state(
                "normal",
                style({
                    transform: "scale(1)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                })
            ),
            state(
                "hover",
                style({
                    transform: "scale(1)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                })
            ),
            transition("normal <=> hover", [animate("300ms ease-in-out")]),
        ]),
    ],
})
export class Col1Row2TileComponent extends TileBaseComponent {}
