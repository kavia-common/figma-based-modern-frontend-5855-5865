import { Injectable } from '@angular/core';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
/**
 * AuthService stub for backend login.
 * Replace logic with real HTTP requests when backend is ready.
 */
export class AuthService {
  login(username: string, password: string): Promise<boolean> {
    // Placeholder: always fake "success"
    return Promise.resolve(true);
  }
  logout(): void {
    // Placeholder; no-op
  }
}
