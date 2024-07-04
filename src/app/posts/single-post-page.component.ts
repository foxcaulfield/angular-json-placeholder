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
import { Observable } from "rxjs";
import { PostsModel } from "./posts.model";
import { postsFeature } from "./posts.reducer";

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
        } `,
    styles: [``],
})
export class SinglePostPageComponent implements OnInit {
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    public postId: number | null = null;

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = parseInt(params.get("id") || "", 10);
            if (isNaN(id)) {
                this.router.navigate(["error"]);
            } else {
                this.postId = id;
                this.postItem$ = this.store.select(postsFeature.selectById(id));
            }
        });
    }

    public postItem$: Observable<PostsModel | undefined> = new Observable<
        PostsModel | undefined
    >();
    public toPosts(): void {
        this.router.navigate(["posts"]);
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
