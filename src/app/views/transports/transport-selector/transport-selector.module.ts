import { NgModule } from '@angular/core';

import { TransportSelectorRoutingModule } from './transport-selector-routing.module';
import { TransportSelectorComponent } from './transport-selector.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { TransportSelectorState } from './store/transport-selector.store.state';
// tslint:disable-next-line: max-line-length
import { TransportSelectorAdvancedSearchComponent } from './transport-selector-advanced-search/transport-selector-advanced-search.component';
import { SharedModule } from '@shared/shared.module';
import { TransportItemComponent } from '../transport-item/transport-item.component';

@NgModule({
  declarations: [
    TransportSelectorComponent,
    TransportSelectorAdvancedSearchComponent,
    TransportItemComponent
  ],
  imports: [
    SharedModule,
    TransportSelectorRoutingModule,
    NgxsModule.forFeature([
      TransportSelectorState
    ]),
    NgxsFormPluginModule
  ]
})
export class TransportSelectorModule { }
