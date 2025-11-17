import {Component, computed, input, output} from '@angular/core';

@Component({
  selector: 'app-month-selector',
  template: `
    <section>
      @for (month of months; track month.getTime()) {
        <button
          (click)="set_month.emit(month)"
          [class.active]="month.getUTCMonth() === date().getUTCMonth()"
        >{{ month.toLocaleDateString(undefined, {month: 'long'}) }}
        </button>
      }
    </section>
  `,
  styles: [`
    section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: .5rem;
      padding: .5rem;
      border: 1px solid lightgrey;
    }

    .active {
      font-weight: bold;
    }
  `]
})
export class MonthSelector {
  public readonly date = input.required<Date>();
  public readonly set_month = output<Date>();

  protected readonly months = computed<Date[]>(() => new Array(12)
    .fill(this.date())
    .map((date, i) => {
      const new_date = new Date(date);
      new_date.setUTCMonth(i);
      return new_date;
    })
  );
}
