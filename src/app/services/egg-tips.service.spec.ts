import { TestBed } from '@angular/core/testing';

import { EggTipsService } from './egg-tips.service';

describe('EggTipsService', () => {
  let service: EggTipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EggTipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
