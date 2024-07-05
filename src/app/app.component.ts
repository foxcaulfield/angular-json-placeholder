import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./common/navbar.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, RouterLink],
    template: ` <app-navbar />
        <div class="content">
            <router-outlet></router-outlet>
        </div>`,
    styles: `
    .content {
  padding-top: 64px; /* Adjust this value to the height of your toolbar */
  
    // max-width: 960px;
    max-width: 960px;
                display: flex;
                //   justify-content: right;
                flex-direction: column;
                //   align-content: center;
                margin: auto;
}
    `,
})
export class AppComponent {
    public title: string = "angular-json-placeholder";
}
