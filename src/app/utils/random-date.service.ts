import { Injectable } from "@angular/core";
import { getRandomDate } from "./random-date.util";

@Injectable({
    providedIn: "root",
})
export class RandomDateService {
    public constructor() {}

    public generateRandomDate(start: Date, end: Date): Date {
        return getRandomDate(start, end);
    }
}
