import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/header/header.module';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { CoreState } from './store/store.state';
import { AppInMemDataService } from '../mock/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environment/environment';

import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

const modules = [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    HeaderModule,
    MatProgressBarModule,
    AppRoutingModule
];

@NgModule({
  imports: [
    modules,

    // Development mode set to true since this is a test project
    NgxsModule.forRoot([CoreState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false }),
    NgxsFormPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),

    // In memory data called in prod build since this is a test project
    HttpClientInMemoryWebApiModule.forRoot(AppInMemDataService, { delay: 700 }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    modules
  ]
})
export class CoreModule { }
