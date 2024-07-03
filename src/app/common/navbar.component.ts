import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        RouterLinkActive,
    ],
    template: `
        <mat-toolbar>
            <button
                mat-button
                class="button"
                routerLink="/"
                ariaCurrentWhenActive="page"
            >
                Home
            </button>
            <span class="example-spacer"></span>

            <button
                mat-button
                class="button"
                routerLink="/posts"
                routerLinkActive="mat-accent"
                ariaCurrentWhenActive="page"
            >
                Posts
            </button>
            <button
                mat-button
                class="button"
                routerLink="/comments"
                routerLinkActive="mat-accent"
                ariaCurrentWhenActive="page"
            >
                Comments
            </button>
            <button
                mat-button
                class="button"
                routerLink="/albums"
                routerLinkActive="mat-accent"
                ariaCurrentWhenActive="page"
            >
                Albums
            </button>
            <button
                mat-button
                class="button"
                routerLink="/photos"
                routerLinkActive="mat-accent"
                ariaCurrentWhenActive="page"
            >
                Photos
            </button>
            <button
                mat-button
                class="button"
                routerLink="/todos"
                routerLinkActive="mat-accent"
                ariaCurrentWhenActive="page"
            >
                Todos
            </button>
            <button
                mat-button
                class="button"
                routerLink="/users"
                routerLinkActive="mat-accent"
                ariaCurrentWhenActive="page"
            >
                Users
            </button>
        </mat-toolbar>
    `,
    styles: `
  .mat-accent {
    background: rgba(255, 255, 255, 0.2)
  }
  .example-spacer {
  flex: 1 1 auto;
}
  `,
})
export class NavbarComponent {}
