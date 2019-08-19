import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportSelectorAdvancedSearchComponent } from './transport-selector-advanced-search.component';

describe('CompetitorsAdvancedSearchComponent', () => {
  let component: TransportSelectorAdvancedSearchComponent;
  let fixture: ComponentFixture<TransportSelectorAdvancedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportSelectorAdvancedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportSelectorAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
