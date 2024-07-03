import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { postsActions } from "./posts.actions";
import { postsFeature } from "./posts.reducer";
import { Observable } from "rxjs";
import { PostsModel } from "./posts.model";
import { AsyncPipe } from "@angular/common";

import { PostItemComponent } from "./post-item.component";
@Component({
    selector: "app-posts-page",
    standalone: true,
    imports: [AsyncPipe, PostItemComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` @for (post of (items$ | async); track post.id) {
        <app-post-item [title]="post.title" [body]="post.body"></app-post-item>

        }`,
    styles: `
    :host {
        max-width: 960px;
        display: flex;
//   justify-content: right;
  flex-direction: column;
//   align-content: center;
  margin: auto;
    }`,
})
export class PostsPageComponent {
    private store: Store = inject(Store);

    public constructor() {
        this.store.dispatch(postsActions.load());
    }

    public errorText$: Observable<string | null> = this.store.select(
        postsFeature.selectError
    );

    public isLoading$: Observable<boolean> = this.store.select(
        postsFeature.selectIsLoading
    );

    public items$: Observable<PostsModel[]> = this.store.select(
        postsFeature.selectItems
    );
}
