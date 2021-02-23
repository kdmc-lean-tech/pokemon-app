import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsFormComponent } from './statistics-form.component';

describe('StatisticsFormComponent', () => {
  let component: StatisticsFormComponent;
  let fixture: ComponentFixture<StatisticsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
