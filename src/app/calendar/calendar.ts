import {Component, input, output} from '@angular/core';
import {Week} from '../helpers/get_weeks_of_month';

@Component({
  selector: 'app-calendar',
  imports: [],
  template: `
    <section>
      @for (week of weeks(); track week[0].getTime()) {
        @for (day of week; track day.getUTCDate()) {
          <button (click)="select_day.emit(day)">
            {{ day.getUTCDate() }}
          </button>
        }
      }
    </section>
  `,
  styleUrl: './calendar.css',
})
export class Calendar {
  public readonly weeks = input.required<Week[]>();
  public readonly select_day = output<Date>();
}
