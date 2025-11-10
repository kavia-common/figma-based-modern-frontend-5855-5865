import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, timer, switchMap } from 'rxjs';
import { EnvironmentService } from './environment.service';

export type HealthStatus = 'unknown' | 'ok' | 'degraded' | 'down';

interface HealthResponse {
  status?: string;
  message?: string;
  timestamp?: string;
  environment?: string;
}

/**
 * PUBLIC_INTERFACE
 * Provides periodic health checks against the backend and exposes status as an observable.
 */
@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(EnvironmentService);

  private readonly status$ = new BehaviorSubject<HealthStatus>('unknown');
  private readonly lastMessage$ = new BehaviorSubject<string | null>(null);

  constructor() {
    // Poll every 15 seconds; faster on dev
    const intervalMs = this.env.nodeEnv === 'development' ? 8000 : 15000;
    timer(0, intervalMs)
      .pipe(
        switchMap(() => this.checkOnce()),
      )
      .subscribe();
  }

  // PUBLIC_INTERFACE
  /**
   * Observable stream of health status.
   */
  get health$(): Observable<HealthStatus> {
    return this.status$.asObservable();
  }

  // PUBLIC_INTERFACE
  /**
   * Observable stream of last message from health endpoint.
   */
  get message$(): Observable<string | null> {
    return this.lastMessage$.asObservable();
  }

  // PUBLIC_INTERFACE
  /**
   * Manually triggers a health check once.
   */
  checkOnce(): Observable<HealthStatus> {
    const url = this.env.healthUrl();
    return this.http.get<HealthResponse>(url).pipe(
      map((r) => {
        const s = (r?.status || '').toLowerCase();
        const normalized: HealthStatus = s === 'ok' ? 'ok' : s === 'degraded' ? 'degraded' : s ? 'down' : 'down';
        this.status$.next(normalized);
        this.lastMessage$.next(r?.message || null);
        return normalized;
      }),
      catchError((err) => {
        if (this.env.shouldLog('warn')) {
          console.warn('[HealthService] health check failed', err);
        }
        this.status$.next('down');
        this.lastMessage$.next('Service unreachable');
        return of('down' as HealthStatus);
      }),
    );
  }
}
