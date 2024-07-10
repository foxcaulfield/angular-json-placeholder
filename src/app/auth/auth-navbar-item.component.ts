import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { authFeature } from "./auth.reducer";
import { AsyncPipe, NgIf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { authActions } from "./auth.actions";
@Component({
    selector: "app-auth-navbar-item",
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        RouterLink,
        RouterLinkActive,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    template: `
        @if (isLoading$ | async) {
        <!-- <button
           
          mat-button>
          <mat-spinner diameter="20"></mat-spinner>
          </button> -->
        <button disabled mat-icon-button>
            <mat-icon>hourglass_top</mat-icon>
        </button>
        } @else { @if (isAuthenticated$ | async) {
        <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>person</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
            <button disabled mat-menu-item>
                <mat-icon>dialpad</mat-icon>
                <span>Redial</span>
            </button>
            <button disabled mat-menu-item disabled>
                <mat-icon>voicemail</mat-icon>
                <span>Check voice mail</span>
            </button>
            <button mat-menu-item (click)="handleLogoutClick()">
                <mat-icon>notifications_off</mat-icon>
                <span>Log out</span>
            </button>
        </mat-menu>

        } @else {
        <a [routerLink]="['/login']" routerLinkActive="mat-accent" mat-button
            >Log in</a
        >
        } }
    `,
    styles: ``,
})
export class AuthNavbarItemComponent {
    private store: Store = inject(Store);

    public isAuthenticated$: Observable<boolean> = this.store.select(
        authFeature.selectIsAuthenticated
    );

    public isLoading$: Observable<boolean> = this.store.select(
        authFeature.selectIsLoading
    );

    public handleLogoutClick(): void {
        //   console.log("Logout")
        this.store.dispatch(authActions.logout());
    }
}
