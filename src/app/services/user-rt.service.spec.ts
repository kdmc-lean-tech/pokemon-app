import { TestBed } from '@angular/core/testing';

import { UserRtService } from './user-rt.service';

describe('UserRtService', () => {
  let service: UserRtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
