import { createFeature, createReducer, createSelector } from "@ngrx/store";
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
    isInitialized: false,
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
        }),

        immerOn(postsActions.delete, (state) => {
            state.isLoading = true;
        }),
        immerOn(postsActions.deleteSuccess, (state, action) => {
            state.isLoading = false;
            state.error = null;
            // state.items.unshift(action.item);
            const index = state.items.findIndex((obj) => obj.id === action.id);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        }),
        immerOn(postsActions.deleteFailure, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        }),

        immerOn(postsActions.update, (state) => {
            state.isLoading = true;
        }),
        immerOn(postsActions.updateSuccess, (state, action) => {
            state.isLoading = false;
            state.error = null;
            // state.items.unshift(action.item);
            const index = state.items.findIndex((obj) => obj.id === action.id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.item };
            }
        }),
        immerOn(postsActions.updateFailure, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    ),
    extraSelectors(baseSelectors) {
        // const selectIsDoneItems = createSelector(
        //   baseSelectors.selectItems,
        //   (items) => items.filter((item) => item.isDone)
        // );

        /**
         * Actual type is quite complex
         *
         * @example
         * type TMSelector = (itemId: PostsModel["id"]) =>
         *                  MemoizedSelector<
         *                      Record<string, unknown>,
         *                      PostsModel | undefined,
         *                      (s1: PostsModel[]) => PostsModel | undefined>;
         *
         * @param itemId
         * @returns
         */
        /* eslint-disable @typescript-eslint/explicit-function-return-type*/
        const selectById = (itemId: PostsModel["id"]) =>
            createSelector(baseSelectors.selectItems, (items) =>
                items.find((item) => item.id === itemId)
            );
        return { selectById };
    },
});

export const {
    name,
    reducer,
    selectItems,
    selectIsLoading,
    selectError,
    selectIsInitialized,
} = postsFeature;
