import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDeletePageComponent } from './food-delete-page.component';

describe('FoodDeletePageComponent', () => {
  let component: FoodDeletePageComponent;
  let fixture: ComponentFixture<FoodDeletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodDeletePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDeletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
