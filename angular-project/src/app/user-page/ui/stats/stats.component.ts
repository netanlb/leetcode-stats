import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SkillStats, SkillTag } from '../../../models/skill-stats.model';
import { ChartComponent } from '../../../shared/ui/chart/chart.component';

type SkillLevels = 'advanced' | 'intermediate' | 'fundamental';

@Component({
  selector: 'app-stats',
  imports: [ChartComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent {
  public skillStats = input.required<SkillStats>();
  public chartOptions: Signal<Highcharts.Options[]> = computed(() => {
    const options = [];

    for (const skillLevel of ['fundamental', 'intermediate', 'advanced'].filter(this.isSkillLevel)) {
      options.push(this.buildChart(skillLevel));
    }

    return options;
  })

  private getChartOptions(title: Highcharts.TitleOptions, categories: string[], series: Highcharts.SeriesOptionsType[]): Highcharts.Options {
    return {
      chart: {
        type: 'column',
        inverted: true,
      },
      title,
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: series,
      legend: {
        enabled: false
      },
    }
  }


  private buildChart(selected: SkillLevels): Highcharts.Options {
    if (!this.skillStats().tagProblemCounts[selected].length) return {
      title: { text: selected, align: 'left' },
      subtitle: { text: 'No data...' },
    }
    const title: Highcharts.TitleOptions = this.getTitle(selected);
    const categories: string[] = this.getCategories(selected);
    const series: Highcharts.SeriesOptionsType[] = this.getSeries(selected);

    return this.getChartOptions(title, categories, series);
  }

  private getCategories(selected: SkillLevels): string[] {
    return this.skillStats().tagProblemCounts[selected].map((tag: SkillTag) => tag.tagName);
  }

  private getSeries(selected: SkillLevels): Highcharts.SeriesOptionsType[] {
    const data = this.skillStats().tagProblemCounts[selected].sort((a: SkillTag, b: SkillTag) => b.problemsSolved - a.problemsSolved).map((tag: SkillTag) => ([tag.tagName, tag.problemsSolved]));

    return [{
      name: selected,
      data,
      colorByPoint: true,
      borderRadius: '50%'
    }] as Highcharts.SeriesOptionsType[]
  }

  private getTitle(selected: SkillLevels | 'all'): Highcharts.TitleOptions {
    const text = selected[0].toUpperCase() + selected.slice(1);
    const styles = {
      fundamental: 'text-green-500',
      intermediate: 'text-yellow-500',
      advanced: 'text-red-500',
      all: ''
    }

    return {
      useHTML: true,
      text: `<div class="flex flex-row items-center gap-2"><i class="fa-solid fa-circle ${styles[selected]} text-xs"></i> <span>${text}</span></div>`,
      align: 'left'
    }
  }

  private isSkillLevel(value: any): value is SkillLevels {
    return value === 'fundamental' || value === 'intermediate' || value === 'advanced';
  }
}
