import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { postsFeature } from "./posts/posts.reducer";
import { postsEffects } from "./posts/posts.effects";
import { provideHttpClient } from "@angular/common/http";
import { recipesFeature } from "./recipes/recipes.reducer";
import { recipesEffects } from "./recipes/recipes.effects";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideStore({
            postsFeature: postsFeature.reducer,
            recipesFeature: recipesFeature.reducer,
        }),
        provideEffects(postsEffects, recipesEffects),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: false, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectInZone: true, // If set to true, the connection is established within the Angular zone
        }),
    ],
};
