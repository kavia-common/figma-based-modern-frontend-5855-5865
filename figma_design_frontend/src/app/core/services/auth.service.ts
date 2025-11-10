import { Injectable, Signal, computed, signal } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * AuthState represents minimal authentication information required by the app.
 */
export interface AuthState {
  /** Whether a user is authenticated */
  isAuthenticated: boolean;
  /** Minimal user object; can be extended later */
  user: { email: string } | null;
  /** Optional auth token placeholder for future backend integration */
  token?: string | null;
}

/**
 * PUBLIC_INTERFACE
 * AuthService provides reactive authentication state for the application.
 * Uses Angular Signals for fine-grained reactivity without RxJS overhead.
 * Includes mock login/logout that can be replaced with real API calls later.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Internal mutable state signal */
  private readonly _state = signal<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  /** Readonly signal for consumers */
  readonly state: Signal<AuthState> = computed(() => this._state());

  /** Derived convenience signal */
  readonly isAuthenticated: Signal<boolean> = computed(() => this._state().isAuthenticated);

  // PUBLIC_INTERFACE
  /**
   * Attempts a mock login with provided credentials.
   * Resolves successfully if both fields are non-empty and email superficially looks valid.
   */
  login(email: string, password: string): Promise<AuthState> {
    return new Promise<AuthState>((resolve, reject) => {
      const delay = 450; // simulate brief network latency
      const ok = !!email && !!password && /\S+@\S+\.\S+/.test(email);
      const g: any = (typeof globalThis !== 'undefined' ? globalThis : undefined);

      g?.setTimeout?.(() => {
        if (!ok) {
          return reject(new Error('Invalid credentials'));
        }
        const next: AuthState = {
          isAuthenticated: true,
          user: { email },
          token: 'mock-token',
        };
        this._state.set(next);
        resolve(next);
      }, delay);
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Logs out the current user and clears all auth state.
   */
  logout(): void {
    this._state.set({ isAuthenticated: false, user: null, token: null });
  }

  // PUBLIC_INTERFACE
  /**
   * Exposes the auth state signal for templates (e.g., navbar) to use via .state().
   */
  authState(): Signal<AuthState> {
    return this.state;
  }
}
