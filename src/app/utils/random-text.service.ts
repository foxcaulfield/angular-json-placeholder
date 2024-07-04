import { Injectable } from "@angular/core";
import * as txtgen from "txtgen";

@Injectable({
    providedIn: "root",
})
export class RandomTextService {
    public constructor() {}

    public generateTitle(): string {
        return txtgen.sentence();
    }

    public generateParagraph(): string {
        return txtgen.paragraph();
    }
}
