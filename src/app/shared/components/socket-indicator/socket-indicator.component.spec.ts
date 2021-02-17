import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketIndicatorComponent } from './socket-indicator.component';

describe('SocketIndicatorComponent', () => {
  let component: SocketIndicatorComponent;
  let fixture: ComponentFixture<SocketIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
