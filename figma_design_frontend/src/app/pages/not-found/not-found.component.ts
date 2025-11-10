import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * NotFoundComponent displays a friendly 404 message with navigation options.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="nf-wrap">
      <div class="nf-card">
        <h1>404</h1>
        <p>We couldn't find that page.</p>
        <div class="actions">
          <a class="btn primary" routerLink="/">Go Home</a>
          <a class="btn ghost" routerLink="/about">About</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use '../../../styles/theme.scss' as t;

    .nf-wrap {
      display: grid;
      place-items: center;
      padding: 3rem 1rem;
    }
    .nf-card {
      background: var(--color-surface);
      border: 1px solid rgba(0,0,0,0.06);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: 2rem;
      max-width: 560px;
      text-align: center;
    }
    h1 {
      font-size: clamp(2.5rem, 4vw + 1rem, 3.5rem);
      margin: 0 0 0.25rem 0;
      color: var(--color-text);
    }
    p {
      color: #4b5563;
      margin-bottom: 1rem;
    }
    .actions {
      margin-top: 0.5rem;
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  `],
})
export class NotFoundComponent {}
