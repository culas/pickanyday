import {Component, computed, linkedSignal, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Calendar} from './calendar/calendar';
import {Controls} from './controls/controls';
import {MonthSelector} from './month-selector/month-selector';

@Component({
  selector: 'app-datepicker',
  imports: [
    FormsModule,
    Calendar,
    Controls,
    MonthSelector,
  ],
  template: `
    <div>
      <app-controls [date]="displayed_date()"
                    (set_to_today)="set_to_today()"
                    (previous_month)="previous_month()"
                    (select_month)="select_month()"
                    (next_month)="next_month()"
                    (previous_year)="previous_year()"
                    (next_year)="next_year()"/>
      @switch (mode()) {
        @case ('calendar') {
          <app-calendar [month]="displayed_date()" [(active_date)]="date"/>
        }
        @case ('month') {
          <app-month-selector [date]="displayed_date()" [active_date]="date()" (set_month)="set_month($event)"/>
        }
      }
      <p>{{ iso_date() }}</p>
    </div> `,
  styles: [`
    div {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }
  `]
})
export class Datepicker {
  protected readonly date = signal(new Date()); // timezone might offset to wrong day
  protected readonly displayed_date = linkedSignal(() => {
    const date = new Date(this.date());
    date.setUTCDate(1);
    return date;
  });
  protected readonly mode = signal<'calendar' | 'month'>('calendar');
  protected readonly iso_date = computed(() => this.date().toISOString().split('T')[0]);

  protected change_month(offset: number) {
    this.displayed_date.update(date => {
      date.setUTCMonth(date.getUTCMonth() + offset);
      return new Date(date);
    });
  }

  protected next_month() {
    this.change_month(1);
  }

  protected previous_month() {
    this.change_month(-1)
  }

  protected next_year() {
    this.change_month(12);
  }

  protected previous_year() {
    this.change_month(-12);
  }

  protected set_to_today() {
    this.date.set(new Date());
  }

  protected set_month(month: Date) {
    this.displayed_date.update(date => {
      date.setUTCMonth(month.getUTCMonth());
      return new Date(date);
    });
    this.mode.set('calendar');
  }

  protected select_month() {
    this.mode.update(mode => mode === 'month' ? 'calendar' : 'month');
  }

}
