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
    ],
    template: `{{ postId }}
        <button (click)="toPosts()">To posts</button>
        @if (postItem$ | async; as post) {
        <p>{{ post.title }}</p>
        <p>{{ post.body }}</p>
        <p>{{ post.id }}</p>
        <p>{{ post.reactions.likes }}</p>
        <p>{{ post.reactions.dislikes }}</p>
        <p>{{ post.tags }}</p>
        <p>{{ post.views }}</p>
        <button mat-button (click)="openUpdateDialog()">Update</button>
        <button mat-button (click)="delete(post.id)">Delete</button>
        @if (comments$ | async) { @for (comment of (comments$ | async); track
        $index) {
        <p>{{ comment.id }}</p>
        <p>{{ comment.body }}</p>
        <p>{{ comment.postId }}</p>
        <p>{{ comment.likes }}</p>
        <p>{{ comment.user.fullName }}</p>
        <p>{{ comment.user.id }}</p>
        <p>{{ comment.user.username }}</p>
        } } } `,
    styles: [``],
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

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = parseInt(params.get("id") || "", 10);
            if (isNaN(id) && id) {
                this.router.navigate(["error"]);
            } else {
                this.postId = id;
                this.postItem$ = this.store.select(postsFeature.selectById(id));
                this.store.dispatch(postsActions.getComments({ id }));
                this.comments$ = this.store.select(
                    postsFeature.selectCommentsById(this.postId)
                );
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
            filter(post => !!post), // Ensure the post is not null or undefined
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
    // public constructor(private route: ActivatedRoute) {
    // Retrieve the 'id' parameter from the route
    // this.route.paramMap.subscribe((params) => {
    //     this.postId = params.get("id");
    // });
    // }

    // public ngOnInit(): void {
    //     this.route.paramMap
    //         .pipe(
    //             map((params) => parseInt(params.get("id") || "", 10)),
    //             map((id) => (this.postId = id)),
    //             map((id) => this.store.select(postsFeature.selectById(id))),
    //             map((post) => {
    //                 if (!post) {
    //                     this.router.navigate(["/error"]); // Redirect to error page
    //                 }
    //                 return post;
    //             })
    //         )
    //         .subscribe((post) => (this.postItem$ = post));
    // }
}
