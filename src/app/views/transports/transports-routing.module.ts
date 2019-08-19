import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE } from '@core/core.config';
import { AsyncEffectsHandler } from '@core/services/async-effects-handler.service';

const routes: Routes = [
  {
    path: 'transport-selector',
    loadChildren: './transport-selector/transport-selector.module#TransportSelectorModule'
  },
 /* {
    path: 'transport-selected-view',
    loadChildren: './views/home/home.module#HomeModule'
  },*/
  APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AsyncEffectsHandler]
})
export class TransportsRoutingModule { }
