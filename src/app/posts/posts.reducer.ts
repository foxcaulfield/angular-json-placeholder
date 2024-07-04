import { createFeature, createReducer } from "@ngrx/store";
import { postsActions, postsFeatureName } from "./posts.actions";
import { PostsModel } from "./posts.model";
import { immerOn } from "ngrx-immer/store";

export interface IPostsFeatureState {
    items: PostsModel[];
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;
}

export const initialState: IPostsFeatureState = {
    items: [],
    isLoading: false,
    error: null,
    isInitialized: false
};

export const postsFeature = createFeature({
    name: postsFeatureName,
    reducer: createReducer(
        initialState,
        immerOn(postsActions.load, (state) => {
            state.isLoading = true;
        }),
        immerOn(postsActions.loadSuccess, (state, action) => {
            state.isInitialized = true;
            state.isLoading = false;
            state.error = null;
            state.items = action.items;
        }),
        immerOn(postsActions.loadFailure, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        }),
        immerOn(postsActions.create, (state) => {
            state.isLoading = true;
        }),
        immerOn(postsActions.createSuccess, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.items.unshift(action.item);
        }),
        immerOn(postsActions.createFailure, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    ),
});

export const { name, reducer, selectItems, selectIsLoading, selectError, selectIsInitialized } =
    postsFeature;
