import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'email-confirm-button',
  templateUrl: './email-confirm-button.component.html',
  styleUrl: './email-confirm-button.component.css'
})
export class EmailConfirmButtonComponent {
  @Input() order!:Order;
}
