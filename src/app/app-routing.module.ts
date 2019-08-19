import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE } from './core/core.config';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'transports',
    loadChildren: './views/transports/transports.module#TransportsModule'
  },
  APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
