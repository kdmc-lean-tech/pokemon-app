import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPokemonImageComponent } from './upload-pokemon-image.component';

describe('UploadPokemonImageComponent', () => {
  let component: UploadPokemonImageComponent;
  let fixture: ComponentFixture<UploadPokemonImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPokemonImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPokemonImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
