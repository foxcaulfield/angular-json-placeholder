import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { postsActions } from "./posts.actions";
import { postsFeature } from "./posts.reducer";
import { Observable } from "rxjs";
import { PostsModel } from "./posts.model";
import { AsyncPipe, NgIf } from "@angular/common";

import { PostItemComponent } from "./post-item.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ErrorPageComponent } from "../common/error-page.component";
@Component({
    selector: "app-posts-page",
    standalone: true,
    imports: [AsyncPipe, NgIf,PostItemComponent, MatProgressBarModule, ErrorPageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (errorText$ | async; as errorText) {
            <app-error-page [errorText]="errorText"/>
        } @else if (isLoading$ | async) {
            <mat-progress-bar mode="query"></mat-progress-bar>
        } @else { 
            @for (post of (items$ | async); track post.id) {
                <app-post-item [title]="post.title" [body]="post.body"></app-post-item>
            } 
        }
        
    `,
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
