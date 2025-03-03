import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cartService/cart.service';
import { CartItem } from '../../../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!:Cart;
  maxQuantity: number = 10;
  quantities: number[] = [];

  ngOnInit() {
    this.populateQuantities();
  }

  populateQuantities() {
    for (let i = 1; i <= this.maxQuantity; i++) {
      this.quantities.push(i);
    }
  }

  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
    })
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem, quantity_str:string){
    const quantity = parseInt(quantity_str);
    this.cartService.changeQuantity(cartItem.food.id,quantity);
  }
}
