import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
} from "@angular/material/card";
import { MatChip, MatChipListbox } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";
import { MatProgressBar } from "@angular/material/progress-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, Observable, take } from "rxjs";
import { CommentModel, PostsModel } from "./posts.model";
import { postsFeature } from "./posts.reducer";
import { postsActions } from "./posts.actions";
import { MatDialog } from "@angular/material/dialog";
import { UpdatePostComponent } from "./update-post.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-singe-post-page",
    standalone: true,
    imports: [
        NgIf,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatChipListbox,
        MatChip,
        MatCardActions,
        MatIcon,
        MatProgressBar,
        AsyncPipe,
        MatButtonModule,
    ],
    template: `
        <div class="progress-bar-container">
            @if (isLoading$ | async) {
            <mat-progress-bar mode="query"></mat-progress-bar>
            }
        </div>
        <div class="container">
            <button mat-stroked-button color="primary" (click)="toPosts()">
                Back to Posts
            </button>
            @if (postItem$ | async; as post) {
            <mat-card>
                <mat-card-header>
                    <mat-card-title>{{ post.title }}</mat-card-title>
                    <mat-card-subtitle
                        >Post ID: {{ post.id }}</mat-card-subtitle
                    >
                </mat-card-header>
                <mat-card-content>
                    <p>{{ post.body }}</p>
                    <div class="reactions">
                        <mat-icon>thumb_up</mat-icon>
                        {{ post.reactions.likes }}
                        <mat-icon>thumb_down</mat-icon>
                        {{ post.reactions.dislikes }}
                    </div>
                    <div class="tags">
                        <mat-chip-listbox>
                            @for (tag of post.tags; track $index) {
                            <mat-chip>{{ tag }}</mat-chip>
                            }
                        </mat-chip-listbox>
                    </div>
                    <p>Views: {{ post.views }}</p>
                </mat-card-content>
                <mat-card-actions>
                    <button
                        mat-raised-button
                        color="accent"
                        (click)="openUpdateDialog()"
                    >
                        Update
                    </button>
                    <button
                        mat-raised-button
                        color="warn"
                        (click)="delete(post.id)"
                    >
                        Delete
                    </button>
                </mat-card-actions>
            </mat-card>
            <div class="comments-section">
                <h3>Comments</h3>
                @if (comments$ | async; as comments) { @for (comment of
                comments; track $index) {
                <mat-card>
                    <mat-card-content>
                        <p>{{ comment.body }}</p>
                        <div class="comment-details">
                            <span>Comment ID: {{ comment.id }}</span>
                            <span>Post ID: {{ comment.postId }}</span>
                            <span>Likes: {{ comment.likes }}</span>
                            <span
                                >User: {{ comment.user.fullName }} ({{
                                    comment.user.username
                                }})</span
                            >
                        </div>
                    </mat-card-content>
                </mat-card>
                } }
            </div>
            } @else {
            <div class="no-post-container">
                <mat-icon color="warn" class="no-post-icon">info</mat-icon>
                <p class="no-post-message">No post with such ID.</p>
            </div>
            }
        </div>
    `,
    styles: [
        `
            .container {
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 16px;
            }
            mat-card {
                margin-bottom: 16px;
            }
            mat-card-content p {
                margin: 0;
                font-size: 14px;
            }
            .reactions {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 8px 0;
            }
            .tags {
                margin: 8px 0;
            }
            .comments-section {
                margin-top: 16px;
            }
            .comment-details {
                display: flex;
                flex-direction: column;
                gap: 4px;
                font-size: 12px;
                color: gray;
            }
            mat-card-actions {
                display: flex;
                justify-content: flex-end;
            }
            .progress-bar-container {
                height: 4px; /* Adjust this to match the height of your progress bar */
            }
            .no-post-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                padding: 16px;
                text-align: center;
            }

            .no-post-message {
                font-size: 18px;
                color: #757575; /* Grey color */
            }
        `,
    ],
})
export class SinglePostPageComponent implements OnInit {
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private readonly dialog: MatDialog = inject(MatDialog);

    public postId: number | null = null;
    public postItem$: Observable<PostsModel | undefined> = new Observable<
        PostsModel | undefined
    >();
    public comments$: Observable<CommentModel[] | undefined> = new Observable<
        CommentModel[] | undefined
    >();
    public isLoading$: Observable<boolean> = this.store.select(
        postsFeature.selectIsLoading
    );
    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = parseInt(params.get("id") || "", 10);
            // TODO Check post is exist in store
            if (isNaN(id) && id) {
                this.router.navigate(["error"]);
            } else {
                this.postId = id;
                this.postItem$ = this.store.select(postsFeature.selectById(id));
                // this.store.dispatch(postsActions.getComments({ id }));

                this.postItem$.subscribe((post) => {
                    if (!post) {
                        // TODO add single post loading
                        this.router.navigate(["posts"]);
                    } else {
                        this.comments$ = this.store.select(
                            postsFeature.selectCommentsById(post.id)
                        );

                        this.comments$.subscribe((comments) => {
                            if (!comments) {
                                this.store.dispatch(
                                    postsActions.getComments({ id })
                                );
                            }
                        });
                    }
                });
            }
        });
    }

    public toPosts(): void {
        this.router.navigate(["posts"]);
    }

    public delete(id: PostsModel["id"]): void {
        this.store.dispatch(postsActions.delete({ id }));
        this.router.navigate(["posts"]);
    }

    public openUpdateDialog(): void {
        this.postItem$
            .pipe(
                filter((post) => !!post), // Ensure the post is not null or undefined
                take(1) // Take only the first emitted value
            )
            .subscribe((post) => {
                const dialogRef = this.dialog.open(UpdatePostComponent, {
                    data: {
                        title: post?.title,
                        body: post?.body,
                        postId: post?.id,
                    },
                });

                dialogRef.afterClosed().subscribe((result) => {
                    console.log(`Dialog result: ${result}`);
                });
            });
    }
}
