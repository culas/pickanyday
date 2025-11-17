import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Calendar} from './calendar/calendar';
import {Controls} from './controls/controls';
import {MonthSelector} from './month-selector/month-selector';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    Calendar,
    Controls,
    MonthSelector
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly date = signal(new Date()); // timezone might offset to wrong day
  protected readonly mode = signal<'calendar' | 'month'>('calendar');
  protected readonly iso_date = computed(() => this.date().toISOString().split('T')[0]);

  protected change_month(offset: number) {
    this.date.update(date => {
      date.setUTCMonth(date.getUTCMonth() + offset);
      // todo: handle overflows (e.g. on 31st change to feb)
      console.log(date.getUTCMonth());
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
    this.date.update(date => {
      date.setUTCMonth(month.getUTCMonth());
      // todo: handle overflows (e.g. on 31st change to feb)
      return new Date(date);
    });
    this.mode.set('calendar');
  }

  protected select_month() {
    this.mode.update(mode => mode === 'month' ? 'calendar' : 'month');
  }
}
