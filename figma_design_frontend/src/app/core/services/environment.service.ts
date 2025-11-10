import { Injectable, inject } from '@angular/core';
import { RuntimeConfigService } from './runtime-config';

/**
 * PUBLIC_INTERFACE
 * Provides environment-aware configuration for API endpoints and app behavior.
 * It prefers values loaded at runtime from assets/config.json via APP_INITIALIZER,
 * but gracefully falls back to window.env, process.env, or sensible local defaults.
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  /** API base URL (e.g., http://localhost:3001/api), resolved from runtime config with sensible fallbacks */
  readonly apiBase: string;
  /** Backend base URL (e.g., http://localhost:3001), resolved for future use or fallback */
  readonly backendUrl: string;
  /** Optional WebSocket URL placeholder */
  readonly wsUrl: string | null;
  /** Node environment string */
  readonly nodeEnv: string;
  /** Optional log level string */
  readonly logLevel: string | null;
  /** Healthcheck path (default /health) */
  readonly healthPath: string;
  /** Feature flags JSON object if provided */
  readonly featureFlags: Record<string, unknown>;
  /** Whether experiments are enabled */
  readonly experimentsEnabled: boolean;

  private readonly cfg = inject(RuntimeConfigService);

  constructor() {
    // Sources in priority: runtime config -> window.env -> process.env -> defaults
    const rc = this.cfg.get() || {};
    const w: any = (globalThis as any).env || (globalThis as any).ENV || {};
    const pe: any = (typeof process !== 'undefined' && (process as any).env) ? (process as any).env : {};

    const backendFromEnv = (rc.NG_APP_BACKEND_URL || w.NG_APP_BACKEND_URL || pe.NG_APP_BACKEND_URL || '').toString().trim();
    this.backendUrl = backendFromEnv || 'http://localhost:3001';

    const apiFromEnv = (rc.NG_APP_API_BASE || w.NG_APP_API_BASE || pe.NG_APP_API_BASE || '').toString().trim();
    this.apiBase = apiFromEnv || `${this.backendUrl.replace(/\/+$/, '')}/api`;

    this.wsUrl = (rc.NG_APP_WS_URL || w.NG_APP_WS_URL || pe.NG_APP_WS_URL || null) || null;
    this.nodeEnv = (w.NG_APP_NODE_ENV || pe.NG_APP_NODE_ENV || 'development').toString();
    this.logLevel = (w.NG_APP_LOG_LEVEL || pe.NG_APP_LOG_LEVEL || null) || null;
    this.healthPath = (w.NG_APP_HEALTHCHECK_PATH || pe.NG_APP_HEALTHCHECK_PATH || '/').toString();

    // Feature flags may arrive as an object (runtime config) or a JSON string (env)
    const flagsFromRuntime = rc.NG_APP_FEATURE_FLAGS;
    let parsed: Record<string, unknown> = {};
    if (flagsFromRuntime && typeof flagsFromRuntime === 'object') {
      parsed = flagsFromRuntime as Record<string, unknown>;
    } else {
      const flagsRaw = (w.NG_APP_FEATURE_FLAGS || pe.NG_APP_FEATURE_FLAGS || '').toString();
      if (flagsRaw) {
        try {
          parsed = JSON.parse(flagsRaw);
        } catch {
          parsed = {};
        }
      }
    }
    this.featureFlags = parsed;

    // Experiments flag may be boolean (runtime) or string (env)
    const expFromRuntime = rc.NG_APP_EXPERIMENTS_ENABLED;
    if (typeof expFromRuntime === 'boolean') {
      this.experimentsEnabled = expFromRuntime;
    } else {
      const expRaw = (w.NG_APP_EXPERIMENTS_ENABLED || pe.NG_APP_EXPERIMENTS_ENABLED || '').toString().toLowerCase();
      this.experimentsEnabled = expRaw === 'true' || expRaw === '1';
    }

    if (this.shouldLog('debug')) {
      console.debug('[EnvironmentService] config', {
        apiBase: this.apiBase,
        backendUrl: this.backendUrl,
        wsUrl: this.wsUrl,
        nodeEnv: this.nodeEnv,
        logLevel: this.logLevel,
        healthPath: this.healthPath,
        featureFlags: this.featureFlags,
        experimentsEnabled: this.experimentsEnabled,
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Whether to log at a given level based on NG_APP_LOG_LEVEL.
   */
  shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const order: Record<string, number> = { debug: 10, info: 20, warn: 30, error: 40 };
    const current = (this.logLevel || (this.nodeEnv === 'development' ? 'debug' : 'info')).toLowerCase();
    return order[level] >= (order[current] ?? 20);
  }

  // PUBLIC_INTERFACE
  /**
   * Builds a full API URL from a path fragment.
   */
  toApiUrl(path: string): string {
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${this.apiBase.replace(/\/+$/, '')}${p}`;
  }

  // PUBLIC_INTERFACE
  /**
   * Returns the full healthcheck URL.
   */
  healthUrl(): string {
    const hp = this.healthPath.startsWith('/') ? this.healthPath : `/${this.healthPath}`;
    return `${this.apiBase.replace(/\/+$/, '')}${hp}`;
  }
}
