import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export default class SearchPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public form = this.fb.group({
    profile: ['', Validators.required],
  })

  public handleSubmit() {
    if (this.form.invalid) return;

    const profile = this.form.value['profile'];
    this.router.navigate([`/user`, profile]);
  }
}
