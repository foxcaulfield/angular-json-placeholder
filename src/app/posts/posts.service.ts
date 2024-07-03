import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ExternalPostModel, PostCreateDto, PostsModel } from "./posts.model";
import { Observable, catchError, map, throwError } from "rxjs";
import { v4 } from "uuid";

@Injectable({
    providedIn: "root",
})
export class PostsService {
    private backendUrl: string = environment.backendUrl;
    private http: HttpClient = inject(HttpClient);

    public constructor() {}

    public getAll(): Observable<PostsModel[]> {
        return this.http
            .get<ExternalPostModel[]>(`${this.backendUrl}/posts`)
            .pipe(
                map((result) => result.map(this.transformToInternal)),
                catchError(this.handleError)
            );
    }

    public getOneById(id: PostsModel["id"]): Observable<PostsModel> {
        return this.http
            .get<ExternalPostModel>(`${this.backendUrl}/${id}`)
            .pipe(
                map((result) => this.transformToInternal(result)),
                catchError(this.handleError)
            );
    }

    public create(createDto: PostCreateDto): Observable<PostsModel> {
        return this.http
            .post<ExternalPostModel>(`${this.backendUrl}/posts`, createDto)
            .pipe(
                map((result) => this.transformToInternal(result)),
                catchError(this.handleError)
            );
    }
    // public update(): Observable<PostsModel> {}
    // public delete(): Observable<PostsModel> {}
    // public filter(): Observable<PostsModel[]> {}
    // public patch(): Observable<PostsModel> {}

    // Error handling
    private handleError(error: { message?: unknown }): Observable<never> {
        console.error("An error occurred", error);
        return throwError(() => error);
    }

    private transformToInternal(extenal: ExternalPostModel): PostsModel {
        const { title, body } = extenal;
        return {
            title,
            body,
            id: v4(),
            userId: extenal.userId.toString(10),
        };
    }
}
``;
