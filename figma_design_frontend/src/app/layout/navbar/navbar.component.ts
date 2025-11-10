import { Component, Signal, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HealthService, HealthStatus } from '../../core/services/health.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private readonly health = inject(HealthService);

  isOpen = signal(false);
  status: Signal<HealthStatus> = computed(() => 'unknown');
  message: Signal<string | null> = computed(() => null);

  constructor() {
    this.health.health$.subscribe((s) => this.status = computed(() => s));
    this.health.message$.subscribe((m) => this.message = computed(() => m));
  }

  // PUBLIC_INTERFACE
  toggle() {
    this.isOpen.update((v) => !v);
  }

  // PUBLIC_INTERFACE
  statusClass(s: HealthStatus): string {
    switch (s) {
      case 'ok':
        return 'status ok';
      case 'degraded':
        return 'status degraded';
      case 'down':
        return 'status down';
      default:
        return 'status unknown';
    }
  }

  // PUBLIC_INTERFACE
  statusLabel(s: HealthStatus): string {
    switch (s) {
      case 'ok':
        return 'Online';
      case 'degraded':
        return 'Degraded';
      case 'down':
        return 'Offline';
      default:
        return 'Checking';
    }
  }
}
