import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { type DummyJsonRecipesResponse } from "./recipes.model";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class RecipesService {
    private backendUrl: string = "https://dummyjson.com";
    private http: HttpClient = inject(HttpClient);

    public constructor() {}

    public getPortion(skip: number): Observable<DummyJsonRecipesResponse> {
        return this.http
            .get<DummyJsonRecipesResponse>(
                `${this.backendUrl}/recipes?limit=10&skip=${skip}`
            )
            .pipe(catchError(this.handleError));
        //   map((result) => result.recipes),
    }

    private handleError(error: { message?: unknown }): Observable<never> {
        console.error("An error occurred", error);
        return throwError(() => error);
    }
}
