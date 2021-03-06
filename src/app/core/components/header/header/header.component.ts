import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import {
  takeUntil,
  distinctUntilChanged
} from 'rxjs/operators';
import { transitions } from '@core/animations/animations';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [transitions],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  public marginSubject$ = new BehaviorSubject<number>(0);
  public toolbarType$ = new BehaviorSubject<number>(1);
  public titleLayoutAlign$ = new BehaviorSubject<string>('center center');
  public scroll$ = new BehaviorSubject<number>(0);
  private unsuscribreAll: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {

    fromEvent(document, 'scroll').pipe(
      takeUntil(this.unsuscribreAll)
    )
      .subscribe(() => {
        const numberY = window.scrollY;
        this.scroll$.next(numberY);
      });

    this.scroll$.pipe(
      takeUntil(this.unsuscribreAll),
      distinctUntilChanged()
    )
      .subscribe(value => {
        if (value > 0 && value < 64) {
          return;
        } else if (value > 0) {
          this.toolbarType$.next(2);
          this.marginSubject$.next(-64);
          this.titleLayoutAlign$.next('start start');
        } else if (value - 64 < 0) {
          this.toolbarType$.next(1);
          this.marginSubject$.next(0);
          this.titleLayoutAlign$.next('center center');
        }
      });

  }

  ngOnDestroy(): void {
    this.unsuscribreAll.next();
    this.unsuscribreAll.complete();
  }
}
