import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cartService/cart.service';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { Cart } from '../../../shared/models/Cart';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit{
  order:Order = new Order();
  checkoutForm!: FormGroup;
  cart!:Cart;

  constructor(private cartService:CartService, private formBuilder:FormBuilder, private userService:UserService, private toastrService:ToastrService,
    private orderService:OrderService,private router:Router){}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
      
      this.order.items = this.cart.items;
      this.order.totalPrice = this.cart.totalPrice;

      let {name, address} = this.userService.currentUser;
      
      this.checkoutForm = this.formBuilder.group({
        name:[name,Validators.required],
        address:[address, Validators.required]
      })
    })
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }
  
    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please select your location on the map', 'Location');
      return;
    }
  
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
    
    this.orderService.create(this.order).subscribe((order) => {
        if (order && order.id) {
          this.router.navigateByUrl('/payment/' + order.id);
        } else {
          this.toastrService.error('Order creation failed', 'Error');
        }
      },
    );
  }
}
