import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Datepicker} from './datepicker/datepicker';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    Datepicker,
  ],
  template: `
    <main>
      <app-datepicker/>
    </main>
  `,
  styles: [`
    main {
      width: 30rem;
      margin: 0 auto;
    }
  `]
})
export class App {

}
