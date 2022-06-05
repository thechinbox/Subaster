import { TestBed } from '@angular/core/testing';

import { ChileinfoService } from './chileinfo.service';

describe('ChileinfoService', () => {
  let service: ChileinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChileinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
