import { TestBed } from '@angular/core/testing';

import { PokemonCarouselService } from './pokemon-carousel.service';

describe('PokemonCarouselService', () => {
  let service: PokemonCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
