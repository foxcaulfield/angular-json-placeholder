import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserModel } from "./user.model";

export const authFeatureName = "authFeature";

export const authActions = createActionGroup({
    source: authFeatureName,
    events: {
        login: props<{ username: string; password: string }>(),
        loginSuccess: props<{ user: UserModel }>(),
        loginFailure: props<{ error: string }>(),

        authOnInit: emptyProps(),
        authOnInitSuccess: props<{ user: UserModel }>(),
        authOnInitFailure: props<{ error: string }>(),

        logout: emptyProps(),
        logoutSuccess: emptyProps(),
        logoutFailure: props<{ error: string }>(),
    },
});
