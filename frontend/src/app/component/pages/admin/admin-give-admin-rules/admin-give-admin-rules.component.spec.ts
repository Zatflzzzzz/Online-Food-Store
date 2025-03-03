import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGiveAdminRulesComponent } from './admin-give-admin-rules.component';

describe('AdminGiveAdminRulesComponent', () => {
  let component: AdminGiveAdminRulesComponent;
  let fixture: ComponentFixture<AdminGiveAdminRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGiveAdminRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGiveAdminRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
