import { Injectable, InjectionToken } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * RuntimeConfig describes the shape of the configuration loaded from assets/config.json.
 * Only keys that must be runtime-tunable belong here; build-time Angular environment
 * files are intentionally avoided so deployments can change values without rebuilds.
 */
export interface RuntimeConfig {
  /** Base API URL, e.g., http://localhost:3001/api */
  NG_APP_API_BASE?: string;
  /** Backend origin URL, e.g., http://localhost:3001 */
  NG_APP_BACKEND_URL?: string;
  /** WebSocket URL, e.g., ws://localhost:3001 */
  NG_APP_WS_URL?: string;
  /** Optional feature flags object */
  NG_APP_FEATURE_FLAGS?: Record<string, unknown>;
  /** Whether experiments are enabled */
  NG_APP_EXPERIMENTS_ENABLED?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Injection token for providing the loaded runtime configuration.
 */
export const RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('RUNTIME_CONFIG');

/**
 * PUBLIC_INTERFACE
 * A simple holder for the runtime configuration with late initialization via APP_INITIALIZER.
 */
@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private _config: RuntimeConfig = {};

  /**
   * PUBLIC_INTERFACE
   * Sets the config loaded by the initializer.
   */
  set(config: RuntimeConfig) {
    this._config = config || {};
  }

  /**
   * PUBLIC_INTERFACE
   * Returns the current runtime config. Consumers should use EnvironmentService
   * for normalized values and fallbacks.
   */
  get(): RuntimeConfig {
    return this._config;
  }
}
