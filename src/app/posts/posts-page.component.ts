import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { postsActions } from "./posts.actions";
import { postsFeature } from "./posts.reducer";
import { Observable } from "rxjs";
import { PostsModel } from "./posts.model";
import { AsyncPipe } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
@Component({
    selector: "app-posts-page",
    standalone: true,
    imports: [AsyncPipe, MatCardModule, MatChipsModule, MatProgressBarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` @for (post of (items$ | async); track post.id) {
        <mat-card class="card" appearance="outlined">
            <mat-card-header>
                <mat-card-title>{{post.title}}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <p>{{ post.body }}</p>
            </mat-card-content>
            <mat-card-footer >
                <mat-chip-set >
                    <mat-chip>botton1</mat-chip>
                    <mat-chip>botton2</mat-chip>
                    <mat-chip>botton3</mat-chip>
                </mat-chip-set>
            </mat-card-footer>
        </mat-card>

        }`,
    styles: ``,
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
