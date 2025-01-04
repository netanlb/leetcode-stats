import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number) {
    const timestamp = typeof value === 'string' || typeof value === 'number' ? this.transformDate(+value).getTime() : value.getTime();

    const now = new Date().getTime();
    const tuples: [string, number][] = [['second', 1000], ['minute', 60], ['hour', 60], ['day', 24], ['week', 7], ['month', 4.35], ['year', 12]];
    let timeAgo = now - timestamp;

    let i = 0;
    while (i < tuples.length) {
      timeAgo = timeAgo / tuples[i][1];
      if (tuples[i + 1] && timeAgo / tuples[i + 1][1] < 1) {
        break;
      }
      i++;
    }

    if (i > tuples.length - 1) i--; // edge case if no time frame found i is out bounds so need to correct it

    let [label, time] = [tuples[i][0], Math.round(timeAgo)];
    label += time > 1 ? 's' : '';

    return `${time} ${label} ago`;
  }

  private transformDate(value: string | number) {
    return new Date(+value);
  }
}

