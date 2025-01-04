import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, Signal, viewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { darkTheme, lightTheme } from '../../consts/chart-themes';
import { DarkModeService } from '../../data-access/dark-mode.service';

let id = 0;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  public readonly id: number = id;
  public chartOptions = input.required<Highcharts.Options>();

  private darkMode = inject(DarkModeService).darkMode;
  private theme = computed(() => {
    return this.darkMode() ? darkTheme : lightTheme;
  });

  private chart!: Highcharts.Chart;

  constructor() {
    id++;

    effect(() => {
      this.theme();
      if (this.chart) {
        Highcharts.setOptions(this.theme());
        this.chart = Highcharts.chart(`chartContainer${this.id}`, this.chartOptions());
      }
    })
  }

  ngAfterViewInit() {
    Highcharts.setOptions(this.theme());
    this.chart = Highcharts.chart(`chartContainer${this.id}`, this.chartOptions());
  }
}
