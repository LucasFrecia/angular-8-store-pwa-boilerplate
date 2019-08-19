import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { TransportItemModel } from '../transport-selector/store/transport-selector.model';

@Component({
  selector: 'app-transport-item',
  templateUrl: './transport-item.component.html',
  styleUrls: ['./transport-item.component.scss']
})
export class TransportItemComponent implements OnInit {

  @Input() item: TransportItemModel;

  constructor() { }

  ngOnInit() {
  }

}
