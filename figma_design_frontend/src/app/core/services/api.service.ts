import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

/**
 * PUBLIC_INTERFACE
 * ApiService centralizes knowledge of the API base URL and URL building.
 * It provides helpers to build full API URLs and a few typed convenience methods.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(EnvironmentService);

  /**
   * PUBLIC_INTERFACE
   * Returns the resolved API base URL (e.g., http://localhost:3001/api).
   */
  getBaseUrl(): string {
    return this.env.getApiBase();
  }

  /**
   * PUBLIC_INTERFACE
   * Build a full API URL by joining the API base with a path fragment.
   * Example: apiUrl('/users') -> http://.../api/users
   */
  apiUrl(path: string): string {
    return this.env.toApiUrl(path);
  }

  /**
   * PUBLIC_INTERFACE
   * Returns the full health endpoint URL using environment defaults.
   */
  healthUrl(): string {
    return this.env.healthUrl();
  }

  /**
   * PUBLIC_INTERFACE
   * Simple GET convenience method that prefixes the path with the API base.
   */
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined | null>): Observable<T> {
    const url = this.apiUrl(path);
    const httpParams = this.toHttpParams(params);
    return this.http.get<T>(url, { params: httpParams });
  }

  private toHttpParams(params?: Record<string, string | number | boolean | undefined | null>): HttpParams | undefined {
    if (!params) return undefined;
    let hp = new HttpParams();
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      hp = hp.set(k, String(v));
    }
    return hp;
  }
}
