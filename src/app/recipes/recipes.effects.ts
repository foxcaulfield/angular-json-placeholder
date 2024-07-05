/* eslint-disable @typescript-eslint/typedef */
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecipesService } from "./recipes.service";
import { recipesActions } from "./recipes.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { selectItemsLoadedCount } from "./recipes.reducer";
import { concatLatestFrom } from "@ngrx/operators";

interface ErrorWithMessage {
    message?: string;
}

@Injectable()
export class recipesEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly recipesService: RecipesService = inject(RecipesService);
    private readonly store: Store = inject(Store);

    public loadRecipes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(recipesActions.load),
            concatLatestFrom(() => this.store.select(selectItemsLoadedCount)),
            mergeMap(([, itemsLoadedCount]) => {
                console.log("itemsLoadedCount", itemsLoadedCount);
                return this.recipesService.getPortion(itemsLoadedCount).pipe(
                    map(recipesActions.loadSuccess),
                    catchError(({ message }: ErrorWithMessage) =>
                        of(
                            recipesActions.loadFailure({
                                error: message || "An error occured",
                            })
                        )
                    )
                );
            })
        );
    });
}
