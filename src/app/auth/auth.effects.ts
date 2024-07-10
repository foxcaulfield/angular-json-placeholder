/* eslint-disable @typescript-eslint/typedef */
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { AuthService } from "./auth.service";
import { authActions } from "./auth.actions";

interface ErrorWithMessage {
    message?: string;
}

@Injectable({
    providedIn: "root",
})
export class AuthEffects {
    private actions$: Actions = inject(Actions);
    private authService: AuthService = inject(AuthService);

    public login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.login),
            mergeMap(({ username, password }) =>
                this.authService.logIn({ username, password }).pipe(
                    map((user) => authActions.loginSuccess({ user })),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            authActions.loginFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });

    public authOnInit$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.authOnInit),
            mergeMap(() =>
                this.authService.authOnInit().pipe(
                    map((user) => authActions.authOnInitSuccess({ user })),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            authActions.loginFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });

    public logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.logout),
            mergeMap(() =>
                this.authService.logout().pipe(
                    map(() => authActions.logoutSuccess()),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            authActions.loginFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });

    public constructor() {}
}
