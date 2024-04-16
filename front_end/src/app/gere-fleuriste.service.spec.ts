import { TestBed } from '@angular/core/testing';

import { GereFleuristeService } from './gere-fleuriste.service';

describe('GereFleuristeService', () => {
  let service: GereFleuristeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GereFleuristeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
