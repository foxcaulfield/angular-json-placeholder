import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PostsModel, PostCreateDto, PostUpdateDto, CommentModel } from "./posts.model";

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

        delete: props<{ id: PostsModel["id"] }>(),
        deleteSuccess: props<{ id: PostsModel["id"] }>(),
        deleteFailure: props<{ error: string }>(),

        update: props<{ id: PostsModel["id"]; item: PostUpdateDto }>(),
        updateSuccess: props<{ id: PostsModel["id"]; item: PostUpdateDto }>(),
        updateFailure: props<{ error: string }>(),

        getComments: props<{ id: PostsModel["id"] }>(),
        getCommentsSuccess: props<{ id: PostsModel["id"], comments: CommentModel[] }>(),
        getCommentsFailure: props<{ error: string }>(),

        registerCommonFailure: props<{ error: string }>(),
    },
});
