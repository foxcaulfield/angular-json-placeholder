import { HttpInterceptorFn } from "@angular/common/http";
import { authFeature } from "./auth.reducer";
import { switchMap, take, throwError } from "rxjs";
import { Store } from "@ngrx/store";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const store: Store = inject(Store);

    return store.select(authFeature.selectIsAuthenticated).pipe(
        take(1),
        switchMap((isAuthenticated) => {
            if (isAuthenticated) {
                return next(req);
            } else {
                // Optionally redirect to login or show a prompt
                console.warn("Request blocked: User not authenticated");

                // Return an empty observable to block the request
                return throwError(() => "unregistred");
            }
        })
    );
};

// import { inject, Injectable } from "@angular/core";
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Observable, of } from "rxjs";
// import { Store } from "@ngrx/store";
// import { authFeature } from "./auth.reducer";
// import { switchMap, take } from "rxjs/operators";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     public constructor(private store: Store) {}

//     public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//         return this.store.select(authFeature.selectIsAuthenticated).pipe(
//             take(1),
//             switchMap(isAuthenticated => {
//                 if (isAuthenticated) {
//                     return next.handle(req);
//                 } else {
//                     // Optionally redirect to login or show a prompt
//                     console.warn('Request blocked: User not authenticated');
//                     // Return an empty observable to block the request
//                     return of();
//                 }
//             })
//         );
//     }
// }
