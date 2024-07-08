import { Component, InputSignal, inject, input } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { PostsModel, PostUpdateDto } from "./posts.model";
import { NgFor } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { postsActions } from "./posts.actions";
import { MatDialog } from "@angular/material/dialog";
import { UpdatePostComponent } from "./update-post.component";
import { Router } from "@angular/router";

@Component({
    selector: "app-post-item",
    standalone: true,
    imports: [
        MatCardModule,
        MatChipsModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        NgFor,
    ],
    template: `
        <mat-card class="card" appearance="outlined">
            <mat-card-header>
                <!-- <section class="title-container"> -->
                <mat-card-title>{{ title() }}</mat-card-title>
                <div class="views">
                    <span>Views: {{ views() }}</span>
                </div>
                <!-- </section> -->

                <mat-card-subtitle
                    >postId: {{ postId() }}
                    <div>
                        <span>User ID: {{ userId() }}</span>
                    </div></mat-card-subtitle
                >
            </mat-card-header>
            <mat-card-content class="subcontent">
                <mat-chip-listbox>
                    @for (tag of tags(); track $index) {
                    <mat-chip>{{ tag }}</mat-chip>
                    }
                </mat-chip-listbox>
            </mat-card-content>
            <mat-card-content class="main-content">
                <p>{{ body() }}</p>
            </mat-card-content>

            <mat-card-footer>
                <mat-card-actions align="end">
                    <div class="progress-container">
                        <mat-progress-bar
                            mode="determinate"
                            [value]="(likes() / (likes() + dislikes())) * 100"
                        ></mat-progress-bar>
                        <div class="reactions">
                            <button mat-button>
                                <mat-icon>thumb_up</mat-icon>
                                {{ likes() }}
                            </button>
                            <button mat-button>
                                <mat-icon>thumb_down</mat-icon>
                                {{ dislikes() }}
                            </button>
                        </div>
                    </div>
                    <section>
                        <button mat-button (click)="openPostPage(postId())">
                            More
                        </button>
                        <button mat-button (click)="openUpdateDialog()">
                            Update
                        </button>
                        <button mat-button (click)="delete(postId())">
                            Delete
                        </button>
                    </section>
                </mat-card-actions>
            </mat-card-footer>
        </mat-card>
    `,
    styles: [
        `
            .card {
                margin: 1rem;
            }
            .progress-container {
                display: flex;
                align-items: center;
                width: 30%; /* Adjust width as needed */
                margin-bottom: 0.5rem; /* Add margin for spacing */
                // display: flex;
                flex-direction: column;
                .reactions {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }
            }
            .progress-container mat-progress-bar {
                flex-grow: 1; /* Allow progress bar to grow within container */
            }
            .progress-container span {
                margin-left: 0.5rem;
            }
            .subcontent {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            mat-card-actions {
                justify-content: space-between;
                padding: 0 16px;
            }

            .title-container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            mat-card-header {
                flex-direction: column;
            }

            .views {
                align-items: end;
                display: flex;
                justify-content: end;
            }

            .main-content {
                padding-bottom: 1em;
            }

            mat-card-subtitle {
                display: none;
            }
        `,
    ],
})
export class PostItemComponent {
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private readonly dialog: MatDialog = inject(MatDialog);

    public title: InputSignal<PostsModel["title"]> =
        input.required<PostsModel["title"]>();
    public body: InputSignal<PostsModel["body"]> =
        input.required<PostsModel["body"]>();
    public postId: InputSignal<PostsModel["id"]> =
        input.required<PostsModel["id"]>();
    public tags: InputSignal<PostsModel["tags"]> =
        input.required<PostsModel["tags"]>();
    public likes: InputSignal<PostsModel["reactions"]["likes"]> =
        input.required<PostsModel["reactions"]["likes"]>();
    public dislikes: InputSignal<PostsModel["reactions"]["dislikes"]> =
        input.required<PostsModel["reactions"]["dislikes"]>();
    public views: InputSignal<PostsModel["views"]> =
        input.required<PostsModel["views"]>();
    public userId: InputSignal<PostsModel["userId"]> =
        input.required<PostsModel["userId"]>();

    public delete(id: PostsModel["id"]): void {
        this.store.dispatch(postsActions.delete({ id }));
    }

    public update(id: PostsModel["id"], updateDto: PostUpdateDto): void {
        this.store.dispatch(postsActions.update({ id, item: updateDto }));
    }

    public openUpdateDialog(): void {
        const dialogRef = this.dialog.open(UpdatePostComponent, {
            data: {
                title: this.title(),
                body: this.body(),
                postId: this.postId(),
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    public openPostPage(id: PostsModel["id"]): void {
        this.router.navigate(["posts", id]);
    }
}
