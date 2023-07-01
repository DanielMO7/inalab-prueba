import { TestBed } from '@angular/core/testing';

import { TokenServicesService } from './token-services.service';

describe('TokenServicesService', () => {
  let service: TokenServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
