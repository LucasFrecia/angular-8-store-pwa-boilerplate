import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CoreState } from './store/store.state';

export class CoreComponent {

    @Select(CoreState.isProgressBarShowing)
    public isLoading$: Observable<boolean>;

}
