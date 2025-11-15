import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Calendar} from './calendar/calendar';
import {Controls} from './controls/controls';
import {get_weeks_of_month} from './helpers/get_weeks_of_month';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    Calendar,
    Controls
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly month = signal(10);
  protected readonly year = signal(2025);

  protected readonly date = computed(() => new Date(Date.UTC(this.year(), this.month())));
  protected readonly weeks = computed(() => get_weeks_of_month(this.date()));

  protected next_month() {
    this.month.update(month => {
      const new_month = (month + 1) % 12;
      if (new_month === 0) {
        this.year.update(year => year + 1);
      }
      return new_month;
    });
  }

  protected previous_month() {
    this.month.update(month => {
      const new_month = (month + 11) % 12;
      if (new_month === 11) {
        this.year.update(year => year - 1);
      }
      return new_month;
    });
  }
}
