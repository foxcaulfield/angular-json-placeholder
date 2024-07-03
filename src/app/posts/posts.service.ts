import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PostsModel } from "./posts.model";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PostsService {
    private backendUrl: string = environment.backendUrl;
    private http: HttpClient = inject(HttpClient);

    public constructor() {}

    public getAll(): Observable<PostsModel[]> {
        return this.http
            .get<PostsModel[]>(`${this.backendUrl}/posts`)
            .pipe(catchError(this.handleError));
    }

    public getOneById(id: PostsModel["id"]): Observable<PostsModel> {
        return this.http
            .get<PostsModel>(`${this.backendUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    
    // public create(): Observable<PostsModel> {}
    // public update(): Observable<PostsModel> {}
    // public delete(): Observable<PostsModel> {}
    // public filter(): Observable<PostsModel[]> {}
    // public patch(): Observable<PostsModel> {}

    // Error handling
    private handleError(error: { message?: unknown }): Observable<never> {
        console.error("An error occurred", error);
        return throwError(() => error);
    }
}
``;
