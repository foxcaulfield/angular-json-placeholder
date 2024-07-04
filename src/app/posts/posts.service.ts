import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ExternalPostModel, PostCreateDto, PostsModel } from "./posts.model";
import { Observable, catchError, map, throwError } from "rxjs";
import { RandomDateService } from "../utils/random-date.service";
import { UniqueRandomIntService } from "../utils/unique-random-int.service";

type DummyJsonResponse = {
    posts: ExternalPostModel[];
    total: number;
    skip: number;
    limit: number;
};

@Injectable({
    providedIn: "root",
})
export class PostsService {
    // private backendUrl: string = environment.backendUrl;
    private backendUrl: string = "https://dummyjson.com";
    private http: HttpClient = inject(HttpClient);
    private randomDateService: RandomDateService = inject(RandomDateService);
    private uniqueRandomIntService: UniqueRandomIntService = inject(
        UniqueRandomIntService
    );

    public constructor() {}

    public getAll(): Observable<PostsModel[]> {
        return this.http
            .get<DummyJsonResponse>(`${this.backendUrl}/posts`)
            .pipe(
                map((result) => result.posts.map(this.transformToInternal)),
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
            .post<ExternalPostModel>(`${this.backendUrl}/posts/add`, createDto)
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
        return throwError(() => error);
    }

    private transformToInternal(extenal: ExternalPostModel): PostsModel {
        return {
            ...extenal,
            id: this.uniqueRandomIntService.generateUniqueRandomInt(),
        };
    }
}
``;
