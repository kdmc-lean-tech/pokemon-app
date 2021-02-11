import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortIndicatorComponent } from './sort-indicator.component';

describe('SortIndicatorComponent', () => {
  let component: SortIndicatorComponent;
  let fixture: ComponentFixture<SortIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
