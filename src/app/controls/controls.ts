import {Component, computed, input, output} from '@angular/core';

@Component({
  selector: 'app-controls',
  template: `
    <section>
      <button (click)="previous_month.emit()">&lt;</button>
      <button>{{ month_name() }}</button>
      <button>{{ year() }}</button>
      <button (click)="next_month.emit()">&gt;</button>
    </section>
  `,
  styles: [`
    section {
      display: flex;
      justify-content: space-between;
      gap: .5rem;
      padding: .5rem;
      border: 1px solid lightgrey;
    }
  `],
})
export class Controls {
  public readonly date = input.required<Date>();

  public readonly previous_month = output<void>();
  public readonly next_month = output<void>();

  protected readonly year = computed(() => this.date().getUTCFullYear());
  protected readonly month_name = computed(() => this.date().toLocaleDateString(undefined, {month: 'long'}));
}
