import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { recipesActions } from "./recipes.actions";
import { selectItems } from "./recipes.reducer";
import { RecipeModel } from "./recipes.model";
import { AsyncPipe } from "@angular/common";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { NotFoundComponent } from "../common/not-found.component";
import { Col3Row1TileComponent } from "./col-3-row-1-tile.component";
import { Col2Row1TileComponent } from "./col-2-row-1-tile.component";
import { Col1Row1TileComponent } from "./col-1-row-1-tile.component";
import { Col1Row2TileComponent } from "./col-1-row-2-tile.component";

@Component({
    selector: "app-recipes-page",
    standalone: true,
    imports: [
        AsyncPipe,
        InfiniteScrollDirective,
        MatGridListModule,
        MatCardModule,
        Col3Row1TileComponent,
        Col2Row1TileComponent,
        Col1Row1TileComponent,
        Col1Row2TileComponent,
        NotFoundComponent,
    ],
    template: `
        <div
            class="tiles-wrapper"
            infinite-scroll
            [infiniteScrollDistance]="scrollDistance"
            [infiniteScrollUpDistance]="scrollUpDistance"
            [infiniteScrollThrottle]="throttle"
            (scrolled)="onScrollDown($event)"
            (scrolledUp)="onUp($event)"
        >
            <mat-grid-list [cols]="cols" rowHeight="300px" [gutterSize]="'16px'">
                @for(item of items$ | async; track item.id; let idx = $index) {
                <mat-grid-tile
                    [colspan]="getColSpan(idx)"
                    [rowspan]="getRowSpan(idx)"
                >
                    <!-- [style.background]="'grey'" -->
                     @switch (true) {
                        @case (getColSpan(idx) === 3 && getRowSpan(idx) === 1) {<app-3-1-tile [recipe]="item" />}
                        @case (getColSpan(idx) === 2 && getRowSpan(idx) === 1) {<app-2-1-tile [recipe]="item" />}
                        @case (getColSpan(idx) === 1 && getRowSpan(idx) === 1) {<app-1-1-tile [recipe]="item" />}
                        @case (getColSpan(idx) === 1 && getRowSpan(idx) === 2) {<app-1-2-tile [recipe]="item" />}
                     }
                </mat-grid-tile>
                }
            </mat-grid-list>
        </div>
    `,
    styles: [
        `
            // * {
            //     font-family: Lato;
            // }
            .tiles-wrapper {
                height: 100%;
            }
            mat-grid-tile {
                display: inline-block;
            }
        `,
    ],
})
export class RecipesPageComponent implements OnInit, OnDestroy {
    private store: Store = inject(Store);
    private destroy$: Subject<void> = new Subject<void>();
    private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

    public throttle: number = 300;
    public scrollDistance: number = 2;
    public scrollUpDistance: number = 2;
    public direction: string = "";
    public cols: number = 3;

    public items$: Observable<RecipeModel[]> = this.store.select(selectItems);

    public constructor() {}

    public ngOnInit(): void {
        this.store.dispatch(recipesActions.load());

        this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((result) => {
                if (result.matches) {
                    if (result.breakpoints[Breakpoints.XSmall]) {
                        this.cols = 1;
                    } else if (result.breakpoints[Breakpoints.Small]) {
                        this.cols = 2;
                    } else if (result.breakpoints[Breakpoints.Medium]) {
                        this.cols = 3;
                    } else if (result.breakpoints[Breakpoints.Large]) {
                        this.cols = 3;
                    } else if (result.breakpoints[Breakpoints.XLarge]) {
                        this.cols = 3;
                    }
                }
            });
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

    public getColSpan(index: number): number {
        if (this.cols === 2) {
            return 2;
        } else if (this.cols === 1) {
            return 1;
        }
        return this.getSize(index).colspan;
    }

    public getRowSpan(index: number): number {
        if (this.cols === 2) {
            return 1;
        } else if (this.cols === 1) {
            return 2;
        }
        return this.getSize(index).rowspan;
    }

    // Function to get the size of the item based on its index
    private getSize(id: number): { colspan: number; rowspan: number } {
        // 3-1 1-2 1-1 2-1
        // 1-2 1-1 2-1 3-1

        // 3-1 1-2 1-1 1-1 2-1
        // 1-1 1-1 1-2 2-1 3-1
        const sizeMap = [
            { colspan: 3, rowspan: 1 },
            { colspan: 1, rowspan: 2 },
            { colspan: 1, rowspan: 1 },
            { colspan: 1, rowspan: 1 },
            { colspan: 2, rowspan: 1 },

            { colspan: 1, rowspan: 1 },
            { colspan: 1, rowspan: 1 },
            { colspan: 1, rowspan: 2 },
            { colspan: 2, rowspan: 1 },
            // { colspan: 3, rowspan: 1 },
        ];
        return sizeMap[id % sizeMap.length];
    }

    public getRowHeight(): string {
        return this.cols === 1 ? '1:2' : '1:1';
    }
}
