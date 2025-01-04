import { Component, computed, input, Signal } from '@angular/core';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { Progress, Submit } from '../../../models/submissions.model';

interface Detail {
  icon: string;
  value: string | null;
  isLink: boolean
}
interface SubmitCount {
  difficulty: string;
  count: number;
  class: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public user = input.required<User>();
  public progress = input.required<Progress>();
  public userDetails: Detail[] = [];

  public submits: Signal<SubmitCount[]> = computed(() => {
    console.log(this.progress());
    const classes: Record<string, string> = {
      All: 'text-textLight dark:text-textDark',
      Hard: 'text-red-500',
      Medium: 'text-yellow-500',
      Easy: 'text-green-500'
    }

    return this.progress().submitStats.acSubmissionNum.map((submit: Submit) => ({ difficulty: submit.difficulty, count: submit.count, class: classes[submit.difficulty] })
    )
  })

  ngOnInit() {
    this.userDetails = [
      { icon: 'fa-solid fa-location-dot', isLink: false, value: this.user().profile.countryName },
      { icon: 'fa-brands fa-github', isLink: true, value: this.user().githubUrl },
      { icon: 'fa-brands fa-linkedin', isLink: true, value: this.user().linkedinUrl },
      { icon: 'fa-solid fa-building', isLink: false, value: this.user().profile.company },
    ];
  }
}
