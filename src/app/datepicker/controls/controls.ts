import {Component, computed, input, output} from '@angular/core';

@Component({
  selector: 'app-controls',
  template: `
    <section>
      <div>
        <button (click)="set_to_today.emit()">{{ today }}</button>
      </div>
      <div>
        <button (click)="previous_month.emit()">&lt;</button>
        <button (click)="select_month.emit()">{{ month_name() }}</button>
        <button (click)="next_month.emit()">&gt;</button>
      </div>
      <div>
        <button (click)="previous_year.emit()">&lt;</button>
        <button (click)="select_year.emit()">{{ year() }}</button>
        <button (click)="next_year.emit()">&gt;</button>
      </div>
    </section>
  `,
  styles: [`
    section {
      display: flex;
      justify-content: space-between;
      gap: .5rem;

      div {
        display: flex;
        gap: .5rem;
        padding: .5rem;
        border: 1px solid lightgrey;
      }
    }
  `],
})
export class Controls {
  public readonly date = input.required<Date>();

  public readonly previous_month = output<void>();
  public readonly next_month = output<void>();

  public readonly previous_year = output<void>();
  public readonly next_year = output<void>();

  public readonly select_month = output<void>();
  public readonly select_year = output<void>();

  public readonly set_to_today = output<void>();

  protected readonly year = computed(() => this.date().getUTCFullYear());
  protected readonly month_name = computed(() => this.date().toLocaleDateString(undefined, {month: 'long'}));

  protected readonly today = new Intl.RelativeTimeFormat(undefined, {
    style: 'narrow',
    numeric: 'auto'
  }).format(0, 'day');
}
