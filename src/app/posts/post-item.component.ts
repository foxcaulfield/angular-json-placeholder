import { Component, InputSignal, input } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardActions, MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { PostsModel } from "./posts.model";
@Component({
    selector: "app-post-item",
    standalone: true,
    imports: [
        MatCardModule,
        MatChipsModule,
        MatProgressBarModule,
        MatCardActions,
        MatButtonModule
    ],
    template: `
        <mat-card class="card" appearance="outlined">
            <mat-card-header>
                <mat-card-title>{{ title() }}</mat-card-title>
                <mat-card-subtitle>postId: {{ postId() }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
                <p>{{ body() }}</p>
            </mat-card-content>
            <mat-card-footer>
                <mat-card-actions align="end">
                    <button mat-button>More</button>
                    <button mat-button>Update</button>
                    <button mat-button>Delete</button>
                </mat-card-actions>
            </mat-card-footer>
        </mat-card>
    `,
    styles: ``,
})
export class PostItemComponent {
    public title: InputSignal<PostsModel["title"]> = input.required<PostsModel["title"]>();
    public body: InputSignal<PostsModel["body"]> = input.required<PostsModel["body"]>();
    public postId: InputSignal<PostsModel["id"]> = input.required<PostsModel["id"]>();
    // public userId: InputSignal<string> = input.required<string>();
}
