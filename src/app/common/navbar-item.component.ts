import { Component, input, InputSignal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-navbar-item",
    standalone: true,
    imports: [MatButtonModule, RouterLink, RouterLinkActive],
    template: `
        <button
            mat-button
            class="button"
            routerLink="{{ linkValue() }}"
            routerLinkActive="mat-accent"
            ariaCurrentWhenActive="page"
        >
            {{ nameValue() }}
        </button>
    `,
    styles: [
        `
            .mat-accent {
                background: rgba(255, 255, 255, 0.2);
            }
        `,
    ],
})
export class NavbarItemComponent {
    public linkValue: InputSignal<string> = input.required<string>();
    public nameValue: InputSignal<string> = input.required<string>();
}
