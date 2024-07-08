import { Component, input, InputSignal } from "@angular/core";
import { RecipeModel } from "./recipes.model";

@Component({
    selector: "app-tile-base",
    standalone: true,
    imports: [],
    template: ``,
    styles: ``,
    host: {
        "(click)": "focusActiveOption()",
    },
})
export class TileBaseComponent {
    public recipe: InputSignal<RecipeModel> = input.required<RecipeModel>();
    public hoverState: "normal" | "hover" = "normal";
    public focusActiveOption(): void {
        console.log(this.recipe().id);
    }
}
