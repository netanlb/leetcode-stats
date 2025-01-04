import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserDataService } from './data-access/user-data.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { HeaderComponent } from './ui/header/header.component';
import { StatsComponent } from './ui/stats/stats.component';
import { RecentProblemsComponent } from './ui/recent-problems/recent-problems.component';
import { ActivityComponent } from './ui/activity/activity.component';

@Component({
  selector: 'app-user-page',
  imports: [HeaderComponent, StatsComponent, RecentProblemsComponent, RouterModule, ActivityComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserPageComponent {
  public dataService = inject(UserDataService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({ profile }) => {
        return forkJoin([
          this.dataService.fetchUserData(profile),
          this.dataService.fetchUserSessionProgress(profile),
          this.dataService.fetchSkillStats(profile),
          this.dataService.fetchRecentSubmits(profile, 15),
          this.dataService.fetchUserCalendar(profile)
        ]);
      }))
      .subscribe();
  }

  ngOnDestroy() {
    this.dataService.cleanUp();
  }
}
