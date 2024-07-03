import { Component, InputSignal, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule, NgIf } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
@Component({
    selector: "app-error-page",
    standalone: true,
    imports: [NgIf, CommonModule, MatButtonModule, MatIconModule, RouterModule],
    template: ` <div class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h1>An Error Occurred</h1>
        <p>Something went wrong. Please try again later.</p>
        @if (errorText()) {
        <p>
            {{ errorText() }}
        </p>
        }
        <button mat-raised-button color="primary" (click)="goHome()">
            Go to Homepage
        </button>
    </div>`,
    styles: [
        `
            .error-container {
                text-align: center;
                padding: 2rem;
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
                border-radius: 0.25rem;
                margin: 2rem;
                box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
            }

            .error-icon {
                // font-size: 4rem;
                margin-bottom: 1rem;
            }

            h1 {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }

            p {
                margin-bottom: 1.5rem;
                font-size: 1.2rem;
            }

            button {
                font-size: 1rem;
            }
        `,
    ],
})
export class ErrorPageComponent {
    private router: Router = inject(Router);

    public constructor() {}
    public errorText: InputSignal<string | undefined> = input<string>();
    public goHome(): void {
        this.router.navigate(["/"]);
    }
}
