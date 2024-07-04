// random-date.util.ts
export function getRandomDate(start: Date, end: Date): Date {
    const startTimestamp = start.getTime();
    const endTimestamp = end.getTime();
    const randomTimestamp =
        startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return new Date(randomTimestamp);
}
