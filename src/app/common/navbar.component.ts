import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NavbarItemComponent } from "./navbar-item.component";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        RouterLinkActive,
        NavbarItemComponent,
    ],
    template: `
        <mat-toolbar class="toolbar">
            <button
                mat-button
                class="button"
                routerLink="/"
                ariaCurrentWhenActive="page"
            >
                Home
            </button>
            <span class="spacer"></span>
            @for(item of items; track $index) {
            <app-navbar-item
                [linkValue]="item.link"
                [nameValue]="item.name"
            ></app-navbar-item>
            }
        </mat-toolbar>
    `,
    styles: `
        .spacer {
        flex: 1 1 auto;
        }
        .toolbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }
  `,
})
export class NavbarComponent {
    public items: Array<{ link: string; name: string }> = [
        { link: "/posts", name: "Posts" },
        { link: "/recipes", name: "Recipes" },
        { link: "/users", name: "Users" },
    ];
}
