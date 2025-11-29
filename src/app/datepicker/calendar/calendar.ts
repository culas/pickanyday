import {Component, computed, input, model} from '@angular/core';
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
                  [class.active]="active_date().getTime() === day.getTime()"
                  (click)="active_date.set(day)">
            {{ day.getUTCDate() }}
          </button>
        }
      }
    </section>
  `,
  styleUrl: './calendar.css',
})
export class Calendar {
  public readonly active_date = model.required<Date>();
  public readonly month = input.required<Date>();

  protected readonly weeks = computed(() => get_weeks_of_month(this.month()));
  protected readonly active_month = computed(() => this.month().getUTCMonth());

  protected readonly weekdays = computed(() => this.weeks()[0].map(day => day.toLocaleDateString(undefined, {weekday: 'short'})))
}
