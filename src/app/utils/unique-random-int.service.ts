import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniqueRandomIntService {
  private generatedNumbers: Set<number>;

  public constructor() {
    this.generatedNumbers = new Set<number>();
  }

  public generateUniqueRandomInt(): number {
    let randomInt: number;

    do {
      randomInt = this.getRandomInt(1000, 9999);
    } while (this.generatedNumbers.has(randomInt));

    this.generatedNumbers.add(randomInt);
    return randomInt;
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Optional: Clear the set of generated numbers
  public clearGeneratedNumbers(): void {
    this.generatedNumbers.clear();
  }
}
