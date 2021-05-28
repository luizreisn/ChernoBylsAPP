import { TestBed } from '@angular/core/testing';

import { MenusEspService } from './menus-esp.service';

describe('MenusEspService', () => {
  let service: MenusEspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusEspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
