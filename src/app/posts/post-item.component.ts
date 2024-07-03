import { Component, InputSignal, input } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
@Component({
    selector: "app-post-item",
    standalone: true,
    imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
    template: `
        <mat-card class="card" appearance="outlined">
            <mat-card-header>
                <mat-card-title>{{ title() }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <p>{{ body() }}</p>
            </mat-card-content>
            <mat-card-footer>
                <mat-chip-set>
                    <mat-chip>botton1</mat-chip>
                    <mat-chip>botton2</mat-chip>
                    <mat-chip>botton3</mat-chip>
                </mat-chip-set>
            </mat-card-footer>
        </mat-card>
    `,
    styles: ``,
})
export class PostItemComponent {
    public title: InputSignal<string> = input.required<string>();
    public body: InputSignal<string> = input.required<string>();
}
