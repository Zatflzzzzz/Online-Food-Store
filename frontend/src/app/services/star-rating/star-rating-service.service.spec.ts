import { TestBed } from '@angular/core/testing';

import { StarRatingServiceService } from './star-rating-service.service';

describe('StarRatingServiceService', () => {
  let service: StarRatingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarRatingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
