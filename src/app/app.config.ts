import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { postsFeature } from "./posts/posts.reducer";
import { postsEffects } from "./posts/posts.effects";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideStore({
          postsFeature: postsFeature.reducer
        }),
        provideEffects(postsEffects),
    ],
};
