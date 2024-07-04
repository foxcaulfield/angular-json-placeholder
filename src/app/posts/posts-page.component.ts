import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { postsActions } from "./posts.actions";
import { postsFeature } from "./posts.reducer";
import { Observable, Subject, takeUntil } from "rxjs";
import { PostsModel } from "./posts.model";
import { AsyncPipe, NgIf } from "@angular/common";

import { PostItemComponent } from "./post-item.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ErrorPageComponent } from "../common/error-page.component";
import { PostsToolbarComponent } from "./posts-toolbar.component";
@Component({
    selector: "app-posts-page",
    standalone: true,
    imports: [
        AsyncPipe,
        NgIf,
        PostItemComponent,
        MatProgressBarModule,
        ErrorPageComponent,
        PostsToolbarComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (errorText$ | async; as errorText) {
        <app-error-page [errorText]="errorText" />
        } @else if (isLoading$ | async) {
        <mat-progress-bar mode="query"></mat-progress-bar>
        } @else {
        <app-posts-toolbar></app-posts-toolbar>
        @for (post of (items$ | async); track post.id) {
        <app-post-item
            [title]="post.title"
            [body]="post.body"
            [postId]="post.id"
            [likes]="post.reactions.likes"
            [dislikes]="post.reactions.dislikes"
            [tags]="post.tags"
            [views]="post.views"
            [userId]="post.userId"
        ></app-post-item>
        } }
    `,
    styles: [
        `
            :host {
                max-width: 960px;
                display: flex;
                //   justify-content: right;
                flex-direction: column;
                //   align-content: center;
                margin: auto;
            }
        `,
    ],
})
export class PostsPageComponent implements OnInit, OnDestroy {
    private store: Store = inject(Store);
    private destroy$: Subject<void> = new Subject<void>();

    public constructor() {}

    public ngOnInit(): void {
        this.selectIsInitialized$
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                if (!result) {
                    this.store.dispatch(postsActions.load());
                }
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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

    public selectIsInitialized$: Observable<boolean> = this.store.select(
        postsFeature.selectIsInitialized
    );
}
