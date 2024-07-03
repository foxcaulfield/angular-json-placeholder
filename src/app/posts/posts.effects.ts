/* eslint-disable @typescript-eslint/typedef */
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "./posts.service";
import { postsActions } from "./posts.actions";
import {
    catchError,
    delay,
    map,
    mergeMap,
    of,
} from "rxjs";

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
                    delay(1000), // imitate loading
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
                    delay(1000),
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
}
