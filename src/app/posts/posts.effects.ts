/* eslint-disable @typescript-eslint/typedef */
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "./posts.service";
import { postsActions } from "./posts.actions";
import { catchError, delay, map, mergeMap, of } from "rxjs";

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
                    catchError((error: { message?: string }) =>
                        of(
                            postsActions.loadFailure({
                                error: error?.message || "An error occured",
                            })
                        )
                    )
                )
            )
        );
    });
}
