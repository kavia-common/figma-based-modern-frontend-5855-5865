import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Users</h1>
      <div class="panel" style="margin-top:2rem">
        <p style="color:var(--color-blue);font-weight:600;">
          (User management and lists go here.)
        </p>
      </div>
    </section>
  `
})
export class UsersComponent {}
