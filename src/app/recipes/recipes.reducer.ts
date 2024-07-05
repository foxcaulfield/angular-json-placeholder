import { createFeature, createReducer } from "@ngrx/store";
import { recipesActions, recipesFeatureName } from "./recipes.actions";
import { RecipeModel } from "./recipes.model";
import { immerOn } from "ngrx-immer/store";

export interface IRecipesFeatureState {
    items: RecipeModel[];
    isLoading: boolean;
    error: string | null;
    itemsLoadedCount: number;
    itemsTotalAvailable: number;
    // isInitialized: boolean;
}

const initialState: IRecipesFeatureState = {
    items: [],
    isLoading: false,
    error: null,
    itemsLoadedCount: 0,
    itemsTotalAvailable: 0,
};

export const recipesFeature = createFeature({
    name: recipesFeatureName,
    reducer: createReducer(
        initialState,
        immerOn(recipesActions.load, (state) => {
            state.isLoading = true;
        }),
        immerOn(recipesActions.loadSuccess, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.itemsLoadedCount += action.recipes.length;
            state.itemsTotalAvailable = action.total
            state.items.push(...action.recipes)
        }),
        immerOn(recipesActions.loadFailure, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    )
});

export const {name,reducer, selectError, selectIsLoading, selectItems, selectItemsLoadedCount} = recipesFeature;