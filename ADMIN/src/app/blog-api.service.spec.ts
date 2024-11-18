import { TestBed } from '@angular/core/testing';

import { BlogAPIService } from './blog-api.service';

describe('BlogAPIService', () => {
  let service: BlogAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
