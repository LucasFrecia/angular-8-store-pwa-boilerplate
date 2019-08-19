import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportSelectorComponent } from './transport-selector.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: TransportSelectorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportSelectorRoutingModule { }
