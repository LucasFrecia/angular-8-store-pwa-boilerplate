import {
  State,
  Action,
  Selector,
  StateContext,
  Store
} from '@ngxs/store';
import {
  tap,
  catchError
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncEffectsHandler } from '@core/services/async-effects-handler.service';
import {
  TransportSelectorStateModel,
  FilterCombo,
  TransportItemModel,
  FormData
} from './transport-selector.model';
import { TransportSelectorService } from '../transport-selector.service';
import {
  CoreShowProgressBarAction,
  CoreHideProgressBarAction
} from '@core/store/store.actions';
import {
  TransportSelectorGetItemsAction,
  TransportSelectorGetItemsSuccessAction,
  TransportSelectorSetErrorAction,
  TransportSelectorPopulateDropdownsAction,
  TransportSelectorFilterDropdownAction,
  TransportSelectorFilterAction,
  TransportSelectorResetFilterAction
} from './transport-selector.store.actions';

const defaultFilter = {
  types: [],
  colors: [],
  brands: []
} as FilterCombo;

const defaultForm = {
  type: '',
  color: '',
  brand: ''
} as FormData;

export const FEATURE_ID = 'transportSelector';

@State<TransportSelectorStateModel>({
  name: FEATURE_ID,
  defaults: {
    items: [],
    originalItems: [], // Items copy to do the filtering
    filterCombos: defaultFilter,
    filterCombosOriginalCopy: defaultFilter,
    form: {
      dirty: false,
      saved: false,
      status: 'INVALID',
      model: defaultForm,
      priorModel: defaultForm,
      errors: {}
    }
  }
})

export class TransportSelectorState {

  constructor(
    private service: TransportSelectorService,
    private store: Store,
    private asyncEffectsService: AsyncEffectsHandler
  ) {

    /** Arm arrays with actions whtat will trigger effects */
    const dispatchedHandledActions = [TransportSelectorGetItemsAction];

    const completedHandledActions = [
      TransportSelectorGetItemsSuccessAction,
      TransportSelectorSetErrorAction
    ];

    /** Feed setActionsEffect method with actions, sideffect and actionHook state where effect will trigger */
    this.asyncEffectsService.setActionsEffect(
      dispatchedHandledActions,
      new CoreShowProgressBarAction(),
      'Dispatched'
    );

    this.asyncEffectsService.setActionsEffect(
      completedHandledActions,
      new CoreHideProgressBarAction(),
      'Completed'
    );
  }

  @Selector()
  public static getState(
    state: TransportSelectorStateModel
  ): TransportSelectorStateModel {
    return state;
  }

  @Selector()
  public static getListItems(
    state: TransportSelectorStateModel
  ): TransportItemModel[] {
    return state.items;
  }

  @Selector()
  public static getfilterCombos(
    state: TransportSelectorStateModel
  ): FilterCombo {
    return state.filterCombos;
  }

  @Selector()
  public static getFormValuesAsArray(
    state: TransportSelectorStateModel
  ): string[] {
    return Object.values(state.form.model);
  }

  @Action(
    TransportSelectorGetItemsAction,
    { cancelUncompleted: true }
    // cancelUncompleted works like switchMap, and will cancel asynchronous actions for ex if a new one is dispatched
  )
  public getTransportItems(
    context: StateContext<TransportSelectorStateModel>,
    action: TransportSelectorGetItemsAction
  ): Observable<TransportItemModel[]> {

    return this.service.getList().pipe(
      tap(data => this.store.dispatch(new TransportSelectorGetItemsSuccessAction(data))),
      catchError(errors => this.store.dispatch(new TransportSelectorSetErrorAction(errors)))
    );
  }

  @Action(TransportSelectorGetItemsSuccessAction)
  public getTransportItemsSuccess(
    context: StateContext<TransportSelectorStateModel>,
    { payload }: TransportSelectorGetItemsSuccessAction
  ): void {

    context.patchState({
      items: payload,
      originalItems: payload
    });

    /** Now that we successfully got the transport item data, dispatch
     * action to populate the advanced search dropdowns
     */
    const feedDropdownsAction = new TransportSelectorPopulateDropdownsAction();
    this.store.dispatch(feedDropdownsAction);
  }

  @Action(TransportSelectorPopulateDropdownsAction)
  public populateDropdowns(
    context: StateContext<TransportSelectorStateModel>,
    action: TransportSelectorPopulateDropdownsAction
  ): void {

    /** Get transport items list to get data from */
    const items = context.getState().originalItems;

    const types = Array.from(
      new Set(
        items.map(
          item => item.type
        )
      )
    ) as string[];

    const colors = Array.from(
      new Set(
        items.map(
          item => item.colors
        ).flat()
      )
    ) as string[];

    const brands = items.map(
      item => item.brand
    ) as string[];

    const newState = { types, colors, brands };

    context.patchState({
      filterCombos: newState,
      filterCombosOriginalCopy: newState
    });
  }


  @Action(TransportSelectorFilterAction)
  public filterList(
    context: StateContext<TransportSelectorStateModel>,
    action: TransportSelectorFilterAction
  ): void {

    const { originalItems, form } = context.getState();

    let newItems: TransportItemModel[] = originalItems;

    if (form.model.brand) {
      newItems = newItems.filter(
        item => item.brand === form.model.brand
      );
    }

    if (form.model.color) {
      newItems = newItems.filter(
        item => item.colors.includes(form.model.color)
      );
    }

    if (form.model.type) {
      newItems = newItems.filter(
        item => item.type === form.model.type
      );
    }

    context.patchState({
      items: newItems || originalItems
    });
  }

  @Action(TransportSelectorResetFilterAction)
  public resetAdvancedFilterModel(
    context: StateContext<TransportSelectorStateModel>,
    action: TransportSelectorResetFilterAction
  ): void {

    const newFilterComboState = context.getState().filterCombosOriginalCopy;

    context.patchState({
      filterCombos: newFilterComboState,
      filterCombosOriginalCopy: newFilterComboState,
      form: {
        dirty: false,
        saved: false,
        status: 'INVALID',
        model: defaultForm,
        priorModel: defaultForm,
        errors: {}
      }
    });

    const getList = new TransportSelectorGetItemsAction();
    this.store.dispatch(getList);
  }

  @Action(TransportSelectorFilterDropdownAction)
  public filterDropdowns(
    context: StateContext<TransportSelectorStateModel>,
    action: TransportSelectorFilterDropdownAction
  ): void {

    const state = context.getState();

    /** Prior filter form model state to match against new selection */
    const priorModel = state.form.priorModel;

    /** Get the list of items */
    const items = state.originalItems;

    /** Find the color & brand the user selected */
    const { color, brand, type } = state.form.model;

    /** Arrays that will hold new state, assign default values */
    let { types, colors, brands } = state.filterCombosOriginalCopy;

    /** Find out what user selected and filter dropdowns accordingly */
    if (color && (priorModel.color !== color)) {

      types = this.getTypes(color, null, items);
      brands = this.getBrands(color, null, items);

    } else if (brand && (priorModel.brand !== brand)) {

      colors = this.getColors(brand, null, items);
      types = this.getTypes(null, brand, items);

    } else if (type && (priorModel.type !== type)) {

      colors = this.getColors(null, type, items);
      brands = this.getBrands(null, type, items);
    }

    context.patchState({
      filterCombos: { types, colors, brands },
      form: { ...state.form, priorModel: state.form.model }
    });
  }

  /**
   * removeFilteredItems Will remove items that have already been ued to filter dropdowns.
   * This will be needed when more than one filter is applied to a same dropdown.
   *
   * @param items     - list of transport items
   * @param selected  - selected string value, either type, color || brand
   * @returns rv      - filtered list of items to be used in subsequent dropdown filters
   */
  private removeFilteredItems(
    items: TransportItemModel[],
    selected: string
  ): TransportItemModel[] {

    const rv = items.map(
      item => {
        if (item.type === selected) {
          return item;
        }
      }
    ).filter(x => x);

    return rv;
  }

  /**
   * dropdownContentFilterFlattener Will filter the required strings from the transport items.
   *
   * @param items           - transport list items from where the results will be taken
   * @param selectedType    - dropdown menu selected by the user
   * @params selectedValue  - value to be matched, all items' attributes that match will be returned
   * @param wantedReturn    - what attribute from each item should be returned if it matches
   * @returns rv            - string[] of desired return type
   */
  private dropdownContentFilterFlattener(
    items: TransportItemModel[],
    selectedType: string,
    selectedValue: string,
    wantedReturn: string
  ): string[] {

    const rv = Array.from(
      new Set(
        items.map(
          item => {
            if (selectedType === 'colors') {
              /** Check if at least 1 of the items colors matches selection */
              if (item[`${selectedType}`].some(itemColor => itemColor === selectedValue)) {
                return item[wantedReturn];
              }
            } else {
              if (item[selectedType] === selectedValue) {
                return item[wantedReturn];
              }
            }
          }
        ).flat()
      )
    ) as string[];

    return rv;
  }

  /**
   * getTypes Returns type array to feed dropdown
   *
   * @param color - will be populated if color was selected
   * @param brand - will be populated if brand was selected
   * @param items - list of items to get data from
   * @returns rv  - array with transport types strings that will populate dropdown
   */
  private getTypes(
    color: string,
    brand: string,
    items: TransportItemModel[]
  ): string[] {

    let rv: string[];

    /** If type was selected, filter colors with matched items */
    if (color) {
      rv = this.dropdownContentFilterFlattener(items, 'colors', color, 'type');

      /** Update items object in case a brand was also selected */
      items = this.removeFilteredItems(items, brand);
    }

    /** If brand was selected, filter colors with matched items */
    if (brand) {
      rv = this.dropdownContentFilterFlattener(items, 'brand', brand, 'type');
    }

    return rv.filter(x => x) as string[];
  }

  /**
   * getBrands Returns brand array to feed dropdown
   *
   * @param color - will be populated if color was selected
   * @param type  - will be populated if type was selected
   * @param items - list of items to get data from
   * @returns rv  - array with brand strings that will populate dropdown
   */
  private getBrands(
    color: string,
    type: string,
    items: TransportItemModel[]
  ): string[] {

    let rv: string[];

    /** If color was selected, filter colors with matched items */
    if (color) {
      rv = this.dropdownContentFilterFlattener(items, 'colors', color, 'brand');

      /** Update items object in case a type was also selected */
      items = this.removeFilteredItems(items, color);
    }

    /** If type was selected, filter items with matched brands */
    if (type) {
      rv = this.dropdownContentFilterFlattener(items, 'type', type, 'brand');
    }

    return rv.filter(x => x) as string[];
  }

  /**
   * getColors Returns color array to feed dropdown
   *
   * @param brand - will be populated if brand was selected
   * @param type  - will be populated if type was selected
   * @param items - list of items to get data from
   * @returns rv  - array with color strings that will populate dropdown
   */
  private getColors(
    brand: string,
    type: string,
    items: TransportItemModel[]
  ): string[] {

    let rv: string[];

    /** If brand was selected, filter colors with matched items */
    if (brand) {
      rv = this.dropdownContentFilterFlattener(items, 'brand', brand, 'colors');

      /** Update items object in case a brand was also selected */
      items = this.removeFilteredItems(items, brand);
    }

    /** If type was selected, filter colors with matched items */
    if (type) {
      rv = this.dropdownContentFilterFlattener(items, 'type', type, 'colors');
    }

    return rv.filter(x => x) as string[];
  }
}
