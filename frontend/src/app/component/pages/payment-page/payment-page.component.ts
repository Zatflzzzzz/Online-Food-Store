import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cartService/cart.service';
import { OrderStatus } from '../../../shared/constants/order.status';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit{
  order:Order = new Order();
  currentUser!:User
  orderId!:string;

  constructor(private orderService: OrderService, private router:Router, private userService:UserService
    ,private toastrService:ToastrService, private activatedRouter:ActivatedRoute,private cartService:CartService){    }

  ngOnInit(): void {
    this.orderId = this.activatedRouter.snapshot.paramMap.get('orderId') || '';
    console.log(this.orderId)
    this.orderService.getOrderForUser(this.orderId).subscribe({
      next:(order)=>{
        this.currentUser = this.userService.currentUser
        this.order = order;
      }
    })
  }

  payForTheOrder(){
    if(this.currentUser.balance < this.order.totalPrice){
      this.toastrService.error('You do not have enough money on your balance, repeat later', "Payment error")
      return
    }

    this.toastrService.success('you have successfully purchased the product, soon the delivery will bring it to you at the specified address', "Payment success")
    
    this.currentUser.balance -= this.order.totalPrice;
    
    this.userService.updateUserData(this.currentUser.id, this.currentUser).subscribe(()=>{
      this.cartService.clearCart();
      this.router.navigateByUrl("/")
    })  
  }
}
