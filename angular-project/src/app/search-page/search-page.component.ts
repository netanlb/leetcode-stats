import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SearchPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public form = this.fb.group({
    profile: ['', Validators.required],
  })

  public errorMessage: string = '';

  public handleSubmit() {
    if (this.form.invalid) return;

    const profile = this.form.value['profile'];
    this.router.navigate([`/user`, profile]);
  }

  ngOnInit() {
    this.route.queryParams.pipe(take(1), tap(({ error }) => {
      this.router.navigate([], { replaceUrl: true });
      this.errorMessage = error;
    })).subscribe();
  }
}
