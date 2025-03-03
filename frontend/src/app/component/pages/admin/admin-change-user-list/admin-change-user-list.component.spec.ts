import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeUserListComponent } from './admin-change-user-list.component';

describe('AdminChangeUserListComponent', () => {
  let component: AdminChangeUserListComponent;
  let fixture: ComponentFixture<AdminChangeUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminChangeUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChangeUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
