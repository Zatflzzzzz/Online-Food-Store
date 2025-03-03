import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmButtonComponent } from './email-confirm-button.component';

describe('EmailConfirmButtonComponent', () => {
  let component: EmailConfirmButtonComponent;
  let fixture: ComponentFixture<EmailConfirmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConfirmButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
