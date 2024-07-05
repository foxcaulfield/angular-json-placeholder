import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { DummyJsonRecipesResponse } from "./recipes.model";

export const recipesFeatureName = "recipesFeature";

export const recipesActions = createActionGroup({
    source: recipesFeatureName,
    events: {
        load: emptyProps(),
        loadSuccess: props<DummyJsonRecipesResponse>(),
        loadFailure: props<{ error: string }>(),
    },
});
