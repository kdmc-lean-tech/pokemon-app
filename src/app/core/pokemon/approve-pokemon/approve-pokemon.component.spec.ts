import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePokemonComponent } from './approve-pokemon.component';

describe('ApprovePokemonComponent', () => {
  let component: ApprovePokemonComponent;
  let fixture: ComponentFixture<ApprovePokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
