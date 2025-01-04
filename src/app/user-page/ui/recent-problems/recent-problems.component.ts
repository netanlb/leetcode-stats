import { Component, input } from '@angular/core';
import { RecentSubmit } from '../../../models/recent-submits.model';
import { TimeAgoPipe } from '../../../shared/ui/date-ago/date-ago.pipe';

@Component({
  selector: 'app-recent-problems',
  imports: [TimeAgoPipe],
  templateUrl: './recent-problems.component.html',
  styleUrl: './recent-problems.component.scss'
})
export class RecentProblemsComponent {
  public recentSubmits = input.required<RecentSubmit[]>();
}
