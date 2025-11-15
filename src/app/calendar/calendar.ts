import {Component, computed, model} from '@angular/core';
import {get_weeks_of_month} from '../helpers/get_weeks_of_month';

@Component({
  selector: 'app-calendar',
  imports: [],
  template: `
    <section>
      @for (weekday of weekdays(); track weekday) {
        <span>{{ weekday }}</span>
      }
      @for (week of weeks(); track week[0].getTime()) {
        @for (day of week; track day.getUTCDate()) {
          <button [class.current-month]="active_month() === day.getUTCMonth()"
                  [class.active]="date().getTime() === day.getTime()"
                  (click)="date.set(day)">
            {{ day.getUTCDate() }}
          </button>
        }
      }
    </section>
  `,
  styleUrl: './calendar.css',
})
export class Calendar {
  public readonly date = model.required<Date>();

  protected readonly weeks = computed(() => get_weeks_of_month(this.date()));
  protected readonly active_month = computed(() => this.date().getUTCMonth());

  protected readonly weekdays = computed(() => this.weeks()[0].map(day => day.toLocaleDateString(undefined, {weekday: 'short'})))
}
