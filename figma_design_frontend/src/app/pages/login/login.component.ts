import { Component, OnDestroy, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// The LoginComponent reproduces the pixel-accurate layout from assets/login-page-497-140
// using component-scoped SCSS and provides a reactive form for email/password.

// PUBLIC_INTERFACE
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  /** Reactive login form with email and password fields */
  form!: FormGroup;

  /** Simple submitting state for demo purpose */
  submitting = signal(false);
  /** Optional message to show submission result */
  message: Signal<string | null> = computed(() => null);

  private subs: Array<() => void> = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize form with validators
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Ported "Login button clicked" behavior: when submit is called and form valid, log details.
    const un = () => {};
    this.subs.push(un);
  }

  ngOnDestroy(): void {
    // cleanup callbacks if any were added
    this.subs.forEach((u) => {
      try { u(); } catch {}
    });
    this.subs = [];
  }

  // PUBLIC_INTERFACE
  /** Submit handler for the login form */
  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);

    // Simulate submission delay and echo to console (placeholder auth)
    // In a real app, integrate with an AuthService and EnvironmentService.apiBase
    const payload = this.form.value;
    console.log('Login attempt', payload);

    // Use globalThis.setTimeout for SSR/lint-safe environment instead of bare setTimeout (no-undef)
    const g: any = (typeof globalThis !== 'undefined' ? globalThis : undefined);
    g?.setTimeout?.(() => {
      this.submitting.set(false);
      // For demo, just log success. Could set a success message signal if needed.
      console.log('Login simulated success');
    }, 600);
  }

  // PUBLIC_INTERFACE
  /** Helper to check control invalid/touched for error display */
  invalid(name: 'email' | 'password'): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
