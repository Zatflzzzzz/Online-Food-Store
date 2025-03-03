import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFoodToListComponent } from './admin-add-food-to-list.component';

describe('AdminAddFoodToListComponent', () => {
  let component: AdminAddFoodToListComponent;
  let fixture: ComponentFixture<AdminAddFoodToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddFoodToListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddFoodToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
