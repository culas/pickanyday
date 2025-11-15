import {Component, computed, model} from '@angular/core';
import {get_weeks_of_month} from '../helpers/get_weeks_of_month';

@Component({
  selector: 'app-calendar',
  imports: [],
  template: `
    <section>
      @for (week of weeks(); track week[0].getTime()) {
        @for (day of week; track day.getUTCDate()) {
          <button (click)="date.set(day)">
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
}
