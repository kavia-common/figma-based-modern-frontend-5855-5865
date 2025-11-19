import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-execution',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Execution</h1>
      <div class="panel" style="margin-top:2rem">
        <p style="color:var(--color-blue);font-weight:600;">
          (This page will show execution progress and controls...)
        </p>
      </div>
    </section>
  `
})
export class ExecutionComponent {}
