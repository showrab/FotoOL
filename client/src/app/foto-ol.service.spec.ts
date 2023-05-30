import { TestBed } from '@angular/core/testing';

import { FotoOlService } from './foto-ol.service';

describe('FotoOlService', () => {
  let service: FotoOlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoOlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
