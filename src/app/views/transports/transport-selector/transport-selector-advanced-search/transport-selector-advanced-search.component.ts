import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import {
  Store,
  Select,
  Actions,
  ofActionSuccessful
} from '@ngxs/store';
import {
  TransportSelectorState,
  FEATURE_ID
} from '../store/transport-selector.store.state';
import {
  FilterCombo,
  FormData
} from '../store/transport-selector.model';
import {
  TransportSelectorResetFilterAction,
  TransportSelectorFilterAction,
  TransportSelectorFilterDropdownAction
} from '../store/transport-selector.store.actions';
import { takeUntil } from 'rxjs/operators';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { StateReset } from 'ngxs-reset-plugin';
import { CoreComponent } from '@core/core.component';

@Component({
  selector: 'app-transport-selector-advanced-search',
  templateUrl: './transport-selector-advanced-search.component.html',
  styleUrls: ['./transport-selector-advanced-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransportSelectorAdvancedSearchComponent extends CoreComponent implements OnInit, AfterViewInit, OnDestroy {

  get type(): AbstractControl {
    return this.form.get('type');
  }

  get color(): AbstractControl {
    return this.form.get('color');
  }

  get brand(): AbstractControl {
    return this.form.get('brand');
  }

  @Select(TransportSelectorState.getfilterCombos)
  public filterCombos$: Observable<FilterCombo>;

  @Select(TransportSelectorState.getFormValuesAsArray)
  public selectedFormData$: Observable<FormData>;

  private unsuscribeAll: Subject<void> = new Subject<void>();

  public form: FormGroup;
  public formPath = `${FEATURE_ID}.form`;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions) {
      super();
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [],
      color: [],
      brand: []
    });
  }

  ngAfterViewInit(): void {

    /** Litsen to form changes to do the cascading filter of the dropdowns */
    this.actions$.pipe(
      takeUntil(this.unsuscribeAll),
      ofActionSuccessful(UpdateFormValue)
    ).subscribe(action => {

      if (action.payload.path === this.formPath) {

        const execAction = new TransportSelectorFilterDropdownAction({
          payload: action.payload.value
        });

        this.store.dispatch(execAction);
      }
    });
  }

  /**
   * resetFilter Will dispatch an action to set form to default state
   * @returns void
   */
  public resetFilter(): void {
    const action = new TransportSelectorResetFilterAction();
    this.store.dispatch(action);
  }

  /**
   * applyFilter will be triggered when user applyes the search values to filter the transport items.
   * No data should be passed since it will consult with the actual state in the store to filter the items.
   * @returns void
   */
  public applyFilter(): void {
    const action = new TransportSelectorFilterAction();
    this.store.dispatch(action);
  }

  ngOnDestroy(): void {
    /** Reset the features state */
    this.store.dispatch(
      new StateReset(TransportSelectorState)
    );

    /** Unsubscribe */
    this.unsuscribeAll.next();
    this.unsuscribeAll.complete();
  }
}
