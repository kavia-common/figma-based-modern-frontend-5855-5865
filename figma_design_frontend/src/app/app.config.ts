import { ApplicationConfig, APP_INITIALIZER, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RUNTIME_CONFIG, RuntimeConfig, RuntimeConfigService } from './core/services/runtime-config';

/**
 * Loads runtime configuration from /assets/config.json at startup.
 */
function loadRuntimeConfig(): () => Promise<void> {
  return () => {
    const http = inject(HttpClient);
    const holder = inject(RuntimeConfigService);
    return new Promise<void>((resolve) => {
      http.get<RuntimeConfig>('/assets/config.json')
        .subscribe({
          next: (cfg) => {
            holder.set(cfg || {});
            resolve();
          },
          error: () => {
            // If missing or failing, proceed with empty config (fall back to env/defaults)
            holder.set({});
            resolve();
          }
        });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    { provide: RUNTIME_CONFIG, useFactory: () => inject(RuntimeConfigService).get() },
    {
      provide: APP_INITIALIZER,
      useFactory: loadRuntimeConfig,
      multi: true,
      deps: [HttpClient, RuntimeConfigService]
    }
  ]
};
