import {
  Component,
  Input
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-toolbar',
  templateUrl: './body-toolbar.component.html',
  styleUrls: ['./body-toolbar.component.scss']
})
export class BodyToolbarComponent  {

  @Input()
  public title: string;

  constructor(private router: Router) {}

  public routeToHome() {
    this.router.navigate(['/home']);
  }
}
