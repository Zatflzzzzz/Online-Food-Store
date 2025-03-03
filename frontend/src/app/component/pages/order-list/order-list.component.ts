import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'] // Исправлено на "styleUrls"
})
export class OrderListComponent implements OnInit {
  order_list!: Order[];
  userId!: string;

  constructor(private orderService: OrderService, private router: Router, private activatedRouter: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.activatedRouter.snapshot.paramMap.get('id') || '';
    
    this.orderService.getAllOrdersForUser(this.userId).subscribe((order_list:Order[])=>{
      this.order_list = order_list  
    });
  }

  navigateToOrder(orderId: number): void {
    this.router.navigateByUrl("payment/"+ orderId)
  }
}
