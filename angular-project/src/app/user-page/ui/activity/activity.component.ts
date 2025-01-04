import { Component, computed, input, Signal } from '@angular/core';
import { UserCalendar } from '../../../models/user-calendar.model';
import * as Highcharts from 'highcharts';
import { ChartComponent } from '../../../shared/ui/chart/chart.component';

@Component({
  selector: 'app-activity',
  imports: [ChartComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  public calendar = input.required<UserCalendar>();
  private noData: Highcharts.Options = {
    title: { text: 'Activity', align: 'left' },
    subtitle: { text: 'No data...' }
  };

  public chartOptions: Signal<Highcharts.Options> = computed(() => {
    const submissionCalendar = this.calendar().userCalendar.submissionCalendar;
    if (!submissionCalendar) return this.noData;
    const rawData: [string, number][] = Object.entries(JSON.parse(submissionCalendar));
    if (!rawData?.length) return this.noData;
    const data: [number, number][] = this.fillGapsInTimeline(rawData);


    return {
      chart: {
        zooming: {
          type: 'x'
        }
      },
      title: {
        useHTML: true,
        text: `<i class="fa-solid fa-calendar-days"></i> Activity`,
        align: 'left'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          marker: {
            radius: 2
          },
          lineWidth: 1,
          color: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgb(199, 113, 243)'],
              [0.7, 'rgb(76, 175, 254)']
            ]
          },
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        type: 'area',
        name: 'Submissions',
        data
      }],

    }
  });

  private fillGapsInTimeline(data: [string, number][]): [number, number][] {
    const rawData: [number, number][] = data.map(([timestamp, value]) => [+timestamp * 1000, value]);
    const mapData = new Map(rawData);

    const min = rawData[0][0];
    const max = rawData[rawData.length - 1][0];
    const day = 1000 * 60 * 60 * 24;

    const res = [];
    for (let timestamp = min; timestamp < max; timestamp += day) {
      const tuple: [number, number] = [timestamp, mapData.get(timestamp) || 0];
      res.push(tuple);
    }

    return res;
  }
}

