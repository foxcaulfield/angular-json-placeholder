import { Component, inject, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-tile-base",
    standalone: true,
    imports: [],
    template: ``,
    styleUrls: ["./tile.base.scss"],

    host: {
        "(click)": "handleClick()",
    },
})
export class TileBaseComponent {
    private router: Router = inject(Router);
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
    public hoverState: "normal" | "hover" = "normal";
    public handleClick(): void {
        this.router.navigate(["recipes", this.recipe().id]);
    }
}
