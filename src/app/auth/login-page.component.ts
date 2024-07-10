import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { authActions } from "./auth.actions";
import { Store } from "@ngrx/store";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { authFeature } from "./auth.reducer";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

type TLoginForm = FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
}>;

@Component({
    selector: "app-login-page",
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatProgressSpinnerModule
        // JsonPipe
    ],
    template: `
        @if (isLoading$ | async) {
            <div> loading... </div> 
            <mat-spinner></mat-spinner>

         } @else { @if (errorText$ | async; as
        errorText) {
        {{ errorText }}
        } @if (isAuthenticated$ | async) {

        <div>You logged in :)</div>
        } @else {

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field>
                <mat-label>Username</mat-label>
                <input
                    matInput
                    [type]="'text'"
                    formControlName="username"
                    placeholder="Username"
                />
            </mat-form-field>

            <mat-form-field>
                <mat-label>Password</mat-label>
                <input
                    matInput
                    [type]="'password'"
                    formControlName="password"
                />
            </mat-form-field>

            <div>
                <button [type]="'submit'" mat-raised-button>Basic</button>
            </div>
        </form>
        } }
    `,
    styles: ``,
})
export class LoginPageComponent {
    private readonly store: Store = inject(Store);
    private formBuilder: FormBuilder = inject(FormBuilder);
    public loginForm: TLoginForm = this.formBuilder.group({
        username: ["", [Validators.required]],
        password: ["", [Validators.required]],
    });

    public errorText$: Observable<string | null> = this.store.select(
        authFeature.selectError
    );

    public isAuthenticated$: Observable<boolean> = this.store.select(
        authFeature.selectIsAuthenticated
    );

    public isLoading$: Observable<boolean> = this.store.select(
        authFeature.selectIsLoading
    );

    public constructor() {}

    public ngOnInit(): void {}

    public onSubmit(): void {
        const username = this.loginForm.get("username")?.value;
        const password = this.loginForm.get("password")?.value;
        if (username && password) {
            this.store.dispatch(authActions.login({ username, password }));
        }
    }
}
