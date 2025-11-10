import { Component, OnDestroy, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

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

  /** Simple submitting state */
  submitting = signal(false);
  /** Message to show submission result */
  message = signal<string | null>(null);

  private subs: Array<() => void> = [];

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  ngOnInit(): void {
    // Initialize form with validators
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

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
  async submit(): Promise<void> {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.message.set(null);

    const { email, password } = this.form.value;

    try {
      const state = await this.auth.login(email, password);
      if (state.isAuthenticated) {
        this.message.set('Logged in');
      }
    } catch (err: any) {
      this.message.set(err?.message || 'Login failed');
    } finally {
      this.submitting.set(false);
    }
  }

  // PUBLIC_INTERFACE
  /** Helper to check control invalid/touched for error display */
  invalid(name: 'email' | 'password'): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
