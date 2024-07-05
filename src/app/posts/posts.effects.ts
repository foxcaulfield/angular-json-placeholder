/* eslint-disable @typescript-eslint/typedef */
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "./posts.service";
import { postsActions } from "./posts.actions";
import { catchError, map, mergeMap, of } from "rxjs";

interface ErrorWithMessage {
    message?: string;
}

@Injectable()
export class postsEffects {
    private actions$: Actions = inject(Actions);
    private postsService: PostsService = inject(PostsService);

    public loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(postsActions.load),
            mergeMap(() =>
                this.postsService.getAll().pipe(
                    map((posts) => postsActions.loadSuccess({ items: posts })),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            postsActions.loadFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });

    public createPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(postsActions.create),
            mergeMap((data) =>
                this.postsService.create(data.item).pipe(
                    map((item) => postsActions.createSuccess({ item })),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            postsActions.createFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });

    public deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(postsActions.delete),
            mergeMap((data) =>
                this.postsService.delete(data.id).pipe(
                    map(({ id }) => postsActions.deleteSuccess({ id })),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            postsActions.deleteFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });

    public updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(postsActions.update),
            mergeMap((data) =>
                this.postsService.update(data.id, data.item).pipe(
                    map((item) => postsActions.updateSuccess(item)),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            postsActions.updateFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });

    public getComments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(postsActions.getComments),
            mergeMap((data) =>
                this.postsService.getPostsComments(data.id).pipe(
                    map(({ id, comments }) =>
                        postsActions.getCommentsSuccess({ id, comments })
                    ),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            postsActions.getCommentsFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });
}
