import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Config</h1>
      <article class="panel" style="margin-top:2rem;">
        <p style="color:var(--color-amber);font-weight:500">
          (This is a placeholder. Your configuration details go here!)
        </p>
      </article>
    </section>
  `
})
export class ConfigComponent {}
