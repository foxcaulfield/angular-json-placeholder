import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: "app-posts-toolbar",
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule],
    template: `
        <mat-toolbar>
            <!-- <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
    <mat-icon>menu</mat-icon>
  </button> -->
            <span>Posts page</span>
            <span class="example-spacer"></span>

            <button mat-raised-button>
                <mat-icon>add</mat-icon>
                add
            </button>
            <button mat-raised-button>
                <mat-icon>filter_alt</mat-icon>
                filter
            </button>
        </mat-toolbar>
    `,
    styles: [
        `
            .example-spacer {
                flex: 1 1 auto;
            }
        `,
    ],
})
export class PostsToolbarComponent {}
