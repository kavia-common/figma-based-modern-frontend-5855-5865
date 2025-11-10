import { Component, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService, HealthStatus } from '../../core/services/health.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  // PUBLIC_INTERFACE
  /** Current year for copyright display */
  readonly year = new Date().getFullYear();

  private readonly health = inject(HealthService);

  /** Reactive health status/message for footer indicator */
  status: Signal<HealthStatus> = computed(() => 'unknown');
  message: Signal<string | null> = computed(() => null);

  constructor() {
    // Bridge Rx streams to signals for simple template binding
    this.health.health$.subscribe((s) => (this.status = computed(() => s)));
    this.health.message$.subscribe((m) => (this.message = computed(() => m)));
  }

  // PUBLIC_INTERFACE
  /** Returns class for the health badge to colorize it. */
  statusClass(s: HealthStatus): string {
    switch (s) {
      case 'ok':
        return 'health ok';
      case 'degraded':
        return 'health degraded';
      case 'down':
        return 'health down';
      default:
        return 'health';
    }
  }

  // PUBLIC_INTERFACE
  /** Returns a short label for health state. */
  statusLabel(s: HealthStatus): string {
    switch (s) {
      case 'ok':
        return 'Online';
      case 'degraded':
        return 'Degraded';
      case 'down':
        return 'Offline';
      default:
        return 'No backend';
    }
  }
}
