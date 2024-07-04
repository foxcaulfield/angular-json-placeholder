import { NgIf } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Store } from "@ngrx/store";
import { postsActions } from "./posts.actions";
import { RandomTextService } from "../utils/random-text.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PostsModel } from "./posts.model";
import { Subject } from "rxjs";

type TPostForm = FormGroup<{
    title: FormControl<string | null>;
    body: FormControl<string | null>;
}>;

@Component({
    selector: "app-update-post",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h2 mat-dialog-title>Update a post #{{incomingData.postId}}</h2>
        <form [formGroup]="postForm" (ngSubmit)="onSubmit()">
            <mat-dialog-content class="mat-typography">
                <mat-form-field>
                    <mat-label>Title</mat-label>
                    <input matInput formControlName="title" />
                    @if(postForm.get('title')?.hasError('required')) {
                    <mat-error> Title is required </mat-error>
                    } @if(postForm.get('title')?.hasError('minlength')) {
                    <mat-error>
                        Title must be at least 5 characters long
                    </mat-error>
                    }
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Body</mat-label>
                    <textarea matInput formControlName="body"></textarea>
                    @if (postForm.get('body')?.hasError('required')) {
                    <mat-error> Body is required </mat-error>
                    } @if (postForm.get('body')?.hasError('minlength')) {
                    <mat-error>
                        Body must be at least 15 characters long
                    </mat-error>
                    }
                </mat-form-field>
                <mat-dialog-actions align="end">
                    <button
                        type="button"
                        mat-button
                        (click)="setRandomContent()"
                    >
                        Set random content
                    </button>
                    <span class="spacer"></span>
                    <button mat-button cdkFocusInitial>Save</button>
                    <button mat-button mat-dialog-close>Cancel</button>
                </mat-dialog-actions>
            </mat-dialog-content>
        </form>
    `,
    styles: [
        `
            mat-form-field {
                width: 100%;
            }
            .spacer {
                flex: 1 1 auto;
                margin: auto;
            }
        `,
    ],
})
export class UpdatePostComponent implements OnInit, OnDestroy {
    private dialogRef: MatDialogRef<UpdatePostComponent> = inject(
        MatDialogRef<UpdatePostComponent>
    );
    private randomTextService: RandomTextService = inject(RandomTextService);
    private store: Store = inject(Store);
    private formBuilder: FormBuilder = inject(FormBuilder);
    private destroy$: Subject<void> = new Subject<void>();

    public incomingData: {
        title: PostsModel["title"];
        body: PostsModel["body"];
        postId: PostsModel["id"];
    } = inject(MAT_DIALOG_DATA);
    public postForm: TPostForm = this.formBuilder.group({
        title: ["", [Validators.required, Validators.minLength(5)]],
        body: ["", [Validators.required, Validators.minLength(15)]],
    });

    public constructor() {}

    public ngOnInit(): void {
        this.postForm.patchValue({
            title: this.incomingData.title,
            body: this.incomingData.body,
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onSubmit(): void {
        const {
            valid: isValid,
            value: { body, title },
        } = this.postForm;

        if (isValid && body && title) {
            this.store.dispatch(
                postsActions.update({
                    id: this.incomingData.postId,
                    item: {
                        body,
                        title,
                        tags: ["common"],
                        userId: 1,
                    },
                })
            );
            this.dialogRef.close();
        }
    }

    public setRandomContent(): void {
        return this.postForm.patchValue({
            title: this.randomTextService.generateTitle(),
            body: this.randomTextService.generateParagraph(),
        });
    }
}
