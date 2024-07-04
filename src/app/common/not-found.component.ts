import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
@Component({
    selector: "app-not-found",
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
    template: `
        <div class="container">
            <mat-card>
                <mat-card-header>
                    <mat-card-title>Page Not Found</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    <p>Oops! The page you're looking for doesn't exist.</p>
                    <p>
                        It might have been moved or deleted. Please check the
                        URL or go back to the homepage.
                    </p>
                    <button
                        mat-raised-button
                        color="primary"
                        (click)="goHome()"
                    >
                        Go to Homepage
                    </button>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
        `
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 40px;
                background-color: #333333; /* Dark background color */
                height: 100%;
                box-sizing: border-box;
            }

            mat-card {
                padding: 20px;
                text-align: center;
                max-width: 500px;
                margin: auto;
                background-color: #424242; /* Darker card background */
                color: #ffffff; /* White text for better contrast */
            }

            mat-card-title {
                font-size: 24px;
                margin-bottom: 10px;
            }

            mat-card-content p {
                margin: 10px 0;
            }

            button {
                margin-top: 20px;
            }
        `,
    ],
})
export class NotFoundComponent {
    private readonly router: Router = inject(Router);

    public goHome(): void {
        this.router.navigate(["/"]);
    }
}
