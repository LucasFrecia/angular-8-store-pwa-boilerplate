import { Component } from '@angular/core';
import { CoreComponent } from './core/core.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent extends CoreComponent {
  title = 'sytac-trains-and-cars';
}
