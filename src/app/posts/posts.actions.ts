import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PostsModel } from "./posts.model";

export const postsFeatureName = "postsFeature";

export const postsActions = createActionGroup({
    source: postsFeatureName,
    events: {
        load: emptyProps(),
        loadSuccess: props<{ items: PostsModel[] }>(),
        loadFailure: props<{ error: string }>(),
    },
});
