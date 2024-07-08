import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TileDetailsComponent } from "./tile-details.component";
import { JsonPipe } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCardModule,
        MatRippleModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatProgressBarModule,
        TileDetailsComponent,
        JsonPipe,
        MatChipsModule,
    ],
    exports: [
        CommonModule,
        MatCardModule,
        MatRippleModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatProgressBarModule,
        TileDetailsComponent,
        JsonPipe,
        MatChipsModule,
    ],
})
export class TileBaseModule {}
