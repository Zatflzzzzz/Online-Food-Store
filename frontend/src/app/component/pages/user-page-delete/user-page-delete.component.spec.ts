import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageDeleteComponent } from './user-page-delete.component';

describe('UserPageDeleteComponent', () => {
  let component: UserPageDeleteComponent;
  let fixture: ComponentFixture<UserPageDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPageDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
