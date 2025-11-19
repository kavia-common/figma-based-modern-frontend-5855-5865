import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="display: flex; flex-wrap: wrap; gap: 2.2rem 2.2rem; justify-content: space-between; margin-bottom: 2.5rem;">
      <div class="dashboard-card" *ngFor="let card of cards">
        <h2 style="margin-bottom: 0.65rem; font-size: 1.38rem;">{{card.label}}</h2>
        <div style="font-size:2.9rem;font-weight:600;color:var(--color-blue);margin-bottom:.2rem">{{card.value}}</div>
        <div [ngStyle]="card.iconStyle"></div>
      </div>
    </section>
    <section style="background: var(--color-surface); border-radius: var(--radius-md); box-shadow: var(--shadow-xs); padding: 2.2rem 1.3rem; margin-bottom:2rem;">
      <h2 style="font-size:2rem;margin-bottom:1.1rem; color:var(--color-blue);font-family:'Abyssinica SIL',serif;">Test Cases</h2>
      <div style="display: flex;align-items:center;justify-content: space-between; flex-wrap:wrap;">
        <div style="flex: 2 1 380px;min-width:280px;">
          <div style="height: 160px; width: 100%; border-radius: var(--radius-md); background: linear-gradient(95deg,#2563EB11 10%,#F59E0B11 90%);box-shadow:var(--shadow-xs);margin-bottom: 1.2rem;display: flex;align-items: flex-end;gap:1.5%">
            <div *ngFor="let k of barData"
                 [style.background]="k.color"
                 [style.width]="k.barWidth"
                 [style.height]="k.barHeight"
                 style="border-radius:6px 6px 0 0; transition:height .7s;flex:1 0 20%;margin:7px 5px 0 0;box-shadow:0 2.5px 8px #2563eb11;">
              <div style="font-size:1.1rem;color:var(--color-blue);font-weight:600;text-align:center;">{{k.label}}</div>
            </div>
          </div>
          <div style="display: flex;justify-content:space-between;">
            <span *ngFor="let k of barData" style="font-size:.97rem; color: var(--color-text);font-weight:500;min-width:50px;text-align:center">{{k.label}}</span>
          </div>
        </div>
        <div style="min-width:180px; margin-left:2.1rem;">
          <h3 style="margin:0 0 0.5rem 0; font-size:1.16rem; color:var(--color-blue)">Legend</h3>
          <div *ngFor="let i of barData"
              style="display:flex;align-items:center;gap:10px;margin-bottom:0.4rem">
            <span style="display:inline-block;width:13px;height:13px;border-radius:3px;background:{{i.color}}"></span>
            <span style="color:var(--color-text);font-size:.97rem">{{i.label}}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .dashboard-card {
      min-width: 220px;
      max-width: 265px;
      flex: 1 0 210px;
      border-radius: var(--radius-md);
      background: var(--color-surface);
      box-shadow: var(--shadow-sm);
      padding: 1.3rem 1.6rem 1.2rem 1.6rem;
      margin-bottom: 0rem;
      transition: box-shadow var(--transition-ease);
      position: relative;
      overflow: hidden;
    }
    .dashboard-card:hover {
      box-shadow: 0 10px 28px -4px rgba(37,99,235,0.14);
      z-index: 2;
      cursor: pointer;
    }
  `]
})
export class DashboardComponent {
  cards = [
    { label: 'Test Suites', value: 20, iconStyle: {width:'32px',height:'32px',background:'#2563EB11',borderRadius:'8px'} },
    { label: 'Passed', value: 15, iconStyle: {width:'32px',height:'32px',background:'#F59E0B33',borderRadius:'8px'} },
    { label: 'Executed', value: 15, iconStyle: {width:'32px',height:'32px',background:'#2563EB44',borderRadius:'8px'} },
    { label: 'Scheduled', value: 5, iconStyle: {width:'32px',height:'32px',background:'#A1A1F611',borderRadius:'8px'} }
  ];
  barData = [
    { label: '4G', color: '#2563EB', barHeight: '64%', barWidth: '16%' },
    { label: '5G', color: '#F59E0B', barHeight: '40%', barWidth: '16%' },
    { label: 'ORAN', color: '#2563EB88', barHeight: '72%', barWidth: '16%' },
    { label: 'SMF', color: '#F59E0B88', barHeight: '30%', barWidth: '16%' }
  ];
}
