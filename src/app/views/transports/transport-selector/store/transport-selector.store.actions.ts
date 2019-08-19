import { TransportItemModel } from './transport-selector.model';

const FEATURE_KEY = '[Transport Selector]';

/**
 * TransportSelectorGetItemsAction Should be dispatched to get list from http request.
 * In this test project in memory web api will intercept the request and deliver mocked results.
 */
export class TransportSelectorGetItemsAction {
  public static readonly type = `${FEATURE_KEY} Get transport items list`;
}

/**
 * TransportSelectorGetItemsSuccessAction Will be triggered only from TransportSelectorGetItemsAction after
 * it has successfully completed the request and will update the store.
 * It should not be called outside of TransportSelectorGetItemsAction action.
 * @param payload - Pass list items to feed store
 */
export class TransportSelectorGetItemsSuccessAction {
  public static readonly type = `${FEATURE_KEY} Get transport items list success`;
  constructor(public readonly payload: TransportItemModel[]) { }
}

/**
 * TransportSelectorPopulateDropdownsAction Action should be dispatched after transport list is
 * succsessfully loaded. It only needs to be called once to do an initial populating of
 * the advanced filter dropdowns.
 */
export class TransportSelectorPopulateDropdownsAction {
  public static readonly type = `${FEATURE_KEY} Populate dropdowns action`;
}

/**
 * TransportSelectorResetFilterAction Should be dispatched each time the advanced form 
 * needs to be reset.
 */
export class TransportSelectorResetFilterAction {
  public static readonly type = `${FEATURE_KEY} Reset advanced filter form action`;
}

/**
 * TransportSelectorFilterAction Execute Transport item list filtering. No data is needed
 * since action will consult current state in store to do the filtering.
 */
export class TransportSelectorFilterAction {
  public static readonly type = `${FEATURE_KEY} Filter transport list items action`;
}

/**
 * TransportSelectorFilterDropdownAction Should receive the payload with type, brand, and color selected on
 * the advanced filter form. With this data it will filter the dropdowns by updatind the store that feeds these
 * dropdowns.
 * @param payload - { type: string, color: string, brand: string }
 */
export class TransportSelectorFilterDropdownAction {
  public static readonly type = `${FEATURE_KEY} Filter dropdowns action`;
  constructor(public readonly payload: any) { }
}

/**
 * TransportSelectorSetErrorAction
 */
export class TransportSelectorSetErrorAction {
  public static readonly type = `${FEATURE_KEY} Set errors`;
  constructor(public readonly payload: any) { }
}
