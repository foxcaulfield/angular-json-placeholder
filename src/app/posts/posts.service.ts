import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    CommentModel,
    ExternalPostModel,
    PostCreateDto,
    PostsModel,
    PostUpdateDto,
} from "./posts.model";
import { Observable, catchError, delay, map, of, throwError } from "rxjs";
import { RandomDateService } from "../utils/random-date.service";
import { UniqueRandomIntService } from "../utils/unique-random-int.service";

type DummyJsonPostsResponse = {
    posts: ExternalPostModel[];
    total: number;
    skip: number;
    limit: number;
};
type DummyJsonCommentsResponse = {
    comments: CommentModel[];
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
            .get<DummyJsonPostsResponse>(`${this.backendUrl}/posts`)
            .pipe(
                map((result) => result.posts),
                catchError(this.handleError)
            );
    }

    public create(createDto: PostCreateDto): Observable<PostsModel> {
        return this.http
            .post<PostCreateDto & { id: number }>(
                `${this.backendUrl}/posts/add`,
                createDto
            )
            .pipe(
                map((result) => {
                    return {
                        ...result,
                        id: this.uniqueRandomIntService.generateUniqueRandomInt(),
                        views: 0,
                        reactions: {
                            likes: 0,
                            dislikes: 0,
                        },
                    };
                }),
                catchError(this.handleError)
            );
    }

    public delete(id: PostsModel["id"]): Observable<{ id: PostsModel["id"] }> {
        return of({ id }).pipe(delay(300));
    }
    public update(
        id: PostsModel["id"],
        updateDto: PostUpdateDto
    ): Observable<{ item: PostUpdateDto; id: PostsModel["id"] }> {
        return of({ id, item: updateDto }).pipe(delay(300));
        // return this.http
        //     .put<ExternalPostModel>(`${this.backendUrl}/posts/${id}`, updateDto)
        // .pipe(catchError(this.handleError));
    }

    public getPostsComments(
        id: PostsModel["id"]
    ): Observable<{ id: PostsModel["id"]; comments: CommentModel[] }> {
        return this.http
            .get<DummyJsonCommentsResponse>(
                `${this.backendUrl}/posts/${id}/comments`
            )
            .pipe(
                map((result) => ({ id, comments: result.comments })),
                catchError(this.handleError)
            );
    }
    // public filter(): Observable<PostsModel[]> {}
    // public patch(): Observable<PostsModel> {}

    // public getOneById(id: PostsModel["id"]): Observable<PostsModel> {
    //     return this.http
    //         .get<ExternalPostModel>(`${this.backendUrl}/${id}`)
    //         .pipe(
    //             map((result) => {
    //                 return this.transformToInternal(result);
    //             }),
    //             catchError(this.handleError)
    //         );
    // }

    // Error handling
    private handleError(error: { message?: unknown }): Observable<never> {
        console.error("An error occurred", error);
        return throwError(() => error);
    }

    // private transformToInternal(extenal: ExternalPostModel): PostsModel {
    //     return {
    //         ...extenal,
    //         id: this.uniqueRandomIntService.generateUniqueRandomInt(),
    //     };
    // }
}
``;
