import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeFoodListComponent } from './admin-change-food-list.component';

describe('AdminChangeFoodListComponent', () => {
  let component: AdminChangeFoodListComponent;
  let fixture: ComponentFixture<AdminChangeFoodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminChangeFoodListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChangeFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
