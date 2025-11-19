import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Test Suites</h1>
      <div class="panel" style="margin:2rem 0 0 0;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:linear-gradient(93deg,#2563EB14 0%,#f9fafb 100%);">
              <th style="padding:1rem;text-align:left;color:var(--color-blue);font-size:1.12rem;">Suite Name</th>
              <th style="padding:1rem;text-align:left;color:var(--color-blue);font-size:1.12rem;">Status</th>
              <th style="padding:1rem;text-align:left;color:var(--color-blue);font-size:1.12rem;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let suite of suites"
                [style.background]="suite.status==='Passed'?'#F0FDF4':suite.status==='Failed'?'#FEF2F2':'#f9fafb'">
              <td style="padding:1rem;font-weight:500;color:var(--color-text);">{{suite.name}}</td>
              <td style="padding:1rem;font-weight:500;">
                <span [ngStyle]="getStatusStyle(suite.status)">
                  {{suite.status}}
                </span>
              </td>
              <td style="padding:1rem;">
                <button class="button" style="padding:.55rem 1.25rem;font-size:.95rem;">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class SuitesComponent {
  suites = [
    { name: 'Smoke A', status: 'Passed' },
    { name: 'Regression Z', status: 'Failed' },
    { name: 'Upgrade Test', status: 'Scheduled' }
  ];
  getStatusStyle(status: string) {
    if (status === 'Passed') return {color: '#22c55e', fontWeight:'bold'};
    if (status === 'Failed') return {color: '#ef4444', fontWeight:'bold'};
    return {color: '#F59E0B', fontWeight:'bold'};
  }
}
