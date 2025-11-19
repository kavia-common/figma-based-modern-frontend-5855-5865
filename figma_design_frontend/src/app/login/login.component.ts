import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="display:flex;align-items:center;justify-content:center;height:75vh;">
      <div style="background:var(--color-surface);box-shadow:0 8px 28px 0 #2563eb22;border-radius:40px;padding:2.4rem 2.2rem;max-width:390px;width:99vw;display:flex;flex-direction:column;gap:1.2rem;">
        <div style="margin: 0 auto 1.3rem auto; display: flex; align-items: center; justify-content: center;">
          <div style="width:120px;height:38px;background:#2563EB19;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Abyssinica SIL',serif;font-weight:bold;font-size:1.2rem;color:var(--color-blue);opacity:.9;">Logo</div>
        </div>
        <form (submit)="login($event)" autocomplete="off" style="display:flex;flex-direction:column;gap:1.1rem;">
          <div>
            <label for="login-username" style="color:#254d73;font-weight:500;margin-bottom:3px;display:block;">Username</label>
            <input id="login-username" name="username" required
              style="width:100%;margin-top:2px;background:#fff;border:1.5px solid #2563EB;border-radius:6px;padding:0.7rem 1rem;color:#111827;" />
          </div>
          <div>
            <label for="login-password" style="color:#254d73;font-weight:500;margin-bottom:3px;display:block;">Password</label>
            <input id="login-password" name="password" type="password" required
              style="width:100%;margin-top:2px;background:#fff;border:1.5px solid #2563EB;border-radius:6px;padding:0.7rem 1rem;color:#111827;" />
          </div>
          <button type="submit" class="button" style="width:100%;margin-top:5px;">
            Login
          </button>
        </form>
        <div style="font-size:.95rem; color:#aaa; text-align:center;">
          &copy; {{year}} OceanPro &mdash; Login screen
        </div>
      </div>
    </section>
  `
})
export class LoginComponent {
  year = new Date().getFullYear();
  // @ts-ignore
  login(event: any) {
    event.preventDefault();
    // Placeholder logic; replace with real login service
    console.log('Login UI only (no backend connected)');
  }
}
