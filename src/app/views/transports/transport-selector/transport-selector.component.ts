import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreComponent } from '@core/core.component';
import { Store, Select } from '@ngxs/store';
import { TransportSelectorGetItemsAction } from './store/transport-selector.store.actions';
import { TransportSelectorState } from './store/transport-selector.store.state';
import { Observable } from 'rxjs';
import { TransportItemModel } from './store/transport-selector.model';

@Component({
  selector: 'app-transport-selector',
  templateUrl: './transport-selector.component.html',
  styleUrls: ['./transport-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransportSelectorComponent extends CoreComponent implements OnInit {

  @Select(TransportSelectorState.getListItems)
  public items$: Observable<TransportItemModel[]>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(TransportSelectorGetItemsAction);
  }

}
