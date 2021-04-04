import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEvolutionPokemonFormComponent } from './select-evolution-pokemon-form.component';

describe('SelectEvolutionPokemonFormComponent', () => {
  let component: SelectEvolutionPokemonFormComponent;
  let fixture: ComponentFixture<SelectEvolutionPokemonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEvolutionPokemonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEvolutionPokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
