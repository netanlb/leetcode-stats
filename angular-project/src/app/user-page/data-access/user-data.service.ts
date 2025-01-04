import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { SkillStats } from '../../models/skill-stats.model';
import { Progress } from '../../models/submissions.model';
import { User } from '../../models/user.model';
import { RecentSubmit } from '../../models/recent-submits.model';
import { UserCalendar } from '../../models/user-calendar.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/leetcode`;

  private _user = signal<User | null>(null);
  public user = this._user.asReadonly();

  private _progress = signal<Progress | null>(null);
  public progress = this._progress.asReadonly();

  private _skills = signal<SkillStats | null>(null);
  public skills = this._skills.asReadonly();

  private _recent = signal<RecentSubmit[] | null>(null);
  public recent = this._recent.asReadonly();

  private _calendar = signal<UserCalendar | null>(null);
  public calendar = this._calendar.asReadonly();

  public fetchUserData(username: string) {
    return this.httpClient.get(`${this.apiUrl}/userPublicProfile/${username}`).pipe(
      tap((data) => {
        this._user.set(data as User);
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  public fetchUserSessionProgress(username: string) {
    return this.httpClient.get(`${this.apiUrl}/userSessionProgress/${username}`).pipe(
      tap((data) => {
        this._progress.set(data as Progress);
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  public fetchSkillStats(username: string) {
    return this.httpClient.get(`${this.apiUrl}/skillStats/${username}`).pipe(
      tap((data) => {
        this._skills.set(data as SkillStats);
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  public fetchRecentSubmits(username: string, limit: number) {
    return this.httpClient.get(`${this.apiUrl}/recentAcSubmissions/${username}`, { params: { limit } }).pipe(
      map((data: any) =>
        data.map((item: RecentSubmit) => ({ ...item, timestamp: item.timestamp + '000' }))
      ),
      tap((data: RecentSubmit[]) => {
        this._recent.set(data);
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  public fetchUserCalendar(username: string) {
    return this.httpClient.get(`${this.apiUrl}/userProfileCalendar/${username}`).pipe(
      tap((data) => {
        this._calendar.set(data as UserCalendar);
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error(error);
    if (error.status === 404) {
      this.router.navigate([''], { queryParams: { error: 'User not found' } });
    } else {
      this.router.navigate([''], { queryParams: { error: 'Something went wrong :(' } })
    }
    return of(null);
  }

  public cleanUp() {
    this._skills.set(null);
    this._recent.set(null);
    this._user.set(null);
    this._progress.set(null);
    this._calendar.set(null);
  }
}
