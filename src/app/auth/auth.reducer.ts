import { createFeature, createReducer, createSelector } from "@ngrx/store";
import { authActions, authFeatureName } from "./auth.actions";
import { immerOn } from "ngrx-immer/store";
import { UserModel } from "./user.model";

export interface IAuthFeatureState {
    // token: string | null;
    error: string | null;
    // isAuthenticated: boolean;
    isLoading: boolean;
    user: UserModel | null;
}

const initialState: IAuthFeatureState = {
    // token: null,
    error: null,
    // isAuthenticated: false,
    isLoading: false,
    user: null,
};

export const authFeature = createFeature({
    name: authFeatureName,
    reducer: createReducer(
        initialState,
        immerOn(authActions.login, (state) => {
            state.isLoading = true;
        }),
        immerOn(authActions.loginSuccess, (state, action) => {
            state.isLoading = false;
            state.error = null;
            // state.token = action.user.token;
            state.user = action.user;
        }),
        immerOn(authActions.loginFailure, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        }),

        immerOn(authActions.authOnInit, (state) => {
            state.isLoading = true;
            state.error = null;
        }),
        immerOn(authActions.authOnInitSuccess, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.user;
        }),
        immerOn(authActions.authOnInitFailure, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        }),

        immerOn(authActions.logout, (state) => {
            // state.user = null;
            // state.error = null;
            state.isLoading = true;
        }),

        immerOn(authActions.logoutSuccess, (state) => {
            state.user = null;
            state.error = null;
            state.isLoading = false;
        }),
        immerOn(authActions.logoutFailure, (state, action) => {
            // state.user = null;
            state.error = action.error;
            state.isLoading = false;
        })
    ),
    extraSelectors(baseSelectors) {
        const selectIsAuthenticated = createSelector(
            baseSelectors.selectUser,
            (user) => !!user
        );

        const selectToken = createSelector(
            baseSelectors.selectUser,
            (user) => user?.token
        );

        return { selectIsAuthenticated, selectToken };
    },
});

export const {
    name,
    reducer,
    selectToken,
    selectIsAuthenticated,
    selectUser,
    selectIsLoading,
    selectError,
} = authFeature;
