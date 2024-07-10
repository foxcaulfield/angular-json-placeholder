import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { UserModel } from "./user.model";

type Credentials = {
    username: string;
    password: string;
};

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly backendUrl: string = "https://dummyjson.com";
    private readonly http: HttpClient = inject(HttpClient);

    private handleError(error: { message?: unknown }): Observable<never> {
        return throwError(() => error);
    }

    public constructor() {}

    public logIn({ username, password }: Credentials): Observable<UserModel> {
        const url = `${this.backendUrl}/auth/login`;
        return this.http
            .post<UserModel>(
                url,
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .pipe(
                map((result) => {
                    console.log("result 0", result);

                    this.setToken(result.token);
                    return result;
                }),
                catchError(this.handleError)
            );
    }

    public authOnInit(): Observable<UserModel> {
        const token: string | null = this.getToken();
        if (!token) {
            throwError(() => "No token found");
        }
        const url: string = `${this.backendUrl}/auth/me`;

        return this.http
            .get<UserModel>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .pipe(
                map((result) => {
                    console.log("result", result);
                    // this.setToken(result.token);
                    return result;
                }),
                catchError((error: { message?: unknown }): Observable<never> => {
                    this.removeToken();
                    return throwError(() => error);
                })
            );
    }

    public logout(): Observable<void> {
        return of(this.removeToken());
    }

    private setToken(token: string): void {
        localStorage.setItem("token", token);
    }

    private getToken(): string | null {
        return localStorage.getItem("token");
    }

    private removeToken(): void {
        localStorage.removeItem("token");
    }
}
