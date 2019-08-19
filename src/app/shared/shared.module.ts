import { NgModule } from '@angular/core';

/** Material Modules */
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BodyToolbarComponent } from '../core/components/body-toolbar/body-toolbar.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule
];

@NgModule({
  declarations: [
    BodyToolbarComponent
  ],
  imports: [
    modules
  ],
  exports: [
    modules,
    BodyToolbarComponent
  ]
})
export class SharedModule { }
