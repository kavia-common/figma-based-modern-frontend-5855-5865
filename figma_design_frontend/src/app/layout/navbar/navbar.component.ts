import { Component, Signal, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HealthService, HealthStatus } from '../../core/services/health.service';
import { AuthService, AuthState } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private readonly health = inject(HealthService);
  private readonly auth = inject(AuthService);

  isOpen = signal(false);
  status: Signal<HealthStatus> = computed(() => 'unknown');
  message: Signal<string | null> = computed(() => null);

  // Auth signals
  authState: Signal<AuthState> = computed(() => this.auth.state());
  isAuthed: Signal<boolean> = computed(() => this.auth.isAuthenticated());

  constructor() {
    this.health.health$.subscribe((s) => (this.status = computed(() => s)));
    this.health.message$.subscribe((m) => (this.message = computed(() => m)));
  }

  // PUBLIC_INTERFACE
  toggle() {
    this.isOpen.update((v) => !v);
  }

  // PUBLIC_INTERFACE
  logout() {
    this.auth.logout();
    // keep menu UX consistent on mobile
    this.isOpen.set(false);
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
