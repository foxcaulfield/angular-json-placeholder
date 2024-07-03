import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PostsModel, PostCreateDto } from "./posts.model";

export const postsFeatureName = "postsFeature";

export const postsActions = createActionGroup({
    source: postsFeatureName,
    events: {
        load: emptyProps(),
        loadSuccess: props<{ items: PostsModel[] }>(),
        loadFailure: props<{ error: string }>(),

        create: props<{ item: PostCreateDto }>(),
        createSuccess: props<{ item: PostsModel }>(),
        createFailure: props<{ error: string }>(),

        registerCommonFailure: props<{ error: string}>()
    },
});
