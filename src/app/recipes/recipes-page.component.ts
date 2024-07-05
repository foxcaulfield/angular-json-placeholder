import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { recipesActions } from "./recipes.actions";
import { selectItems } from "./recipes.reducer";
import { RecipeModel } from "./recipes.model";
import { AsyncPipe } from "@angular/common";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";

@Component({
    selector: "app-recipes-page",
    standalone: true,
    imports: [AsyncPipe, InfiniteScrollDirective],
    template: `
        <div
            class="search-results"
            infinite-scroll
            [infiniteScrollDistance]="scrollDistance"
            [infiniteScrollUpDistance]="scrollUpDistance"
            [infiniteScrollThrottle]="throttle"
            (scrolled)="onScrollDown($event)"
            (scrolledUp)="onUp($event)"
        >
            <!-- @for(item of items$ | async; track item.id) { @defer (on timer(2s)) -->
            @for(item of items$ | async; track item.id) {
            <div style="padding: 50px">{{ item.id }} {{ item.name }}</div>
            }
            <!-- @placeholder {
          <div style="padding: 50px"> loading </div>
          } -->
        </div>
    `,
    styles: [
        `
            * {
                font-family: Lato;
            }
            .search-results {
                height: 100%;
            }
        `,
    ],
})
export class RecipesPageComponent implements OnInit, OnDestroy {
    private store: Store = inject(Store);
    private destroy$: Subject<void> = new Subject<void>();

    public throttle: number = 300;
    public scrollDistance: number = 2;
    public scrollUpDistance: number = 2;
    public direction: string = "";

    public items$: Observable<RecipeModel[]> = this.store.select(selectItems);

    public constructor() {}

    public ngOnInit(): void {
        this.store.dispatch(recipesActions.load());
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onScrollDown(ev: unknown): void {
        console.log("scrolled down!!", ev);
        this.direction = "down";
        this.store.dispatch(recipesActions.load());
    }

    public onUp(ev: unknown): void {
        console.log("scrolled up!", ev);
        this.direction = "up";
    }
}
