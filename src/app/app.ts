import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Calendar} from './calendar/calendar';
import {Controls} from './controls/controls';

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
  protected readonly date = signal(new Date());

  protected change_month(offset: number) {
    this.date.update(date => {
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
}
