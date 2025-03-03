import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cartService/cart.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  cartQuantity=0;
  user!:User;
  userId!:string;

  constructor(private cartService:CartService, private userService:UserService,private activatedRoute: ActivatedRoute){
    this.userService.userObservable.subscribe((currentUser) => {
      this.user = currentUser;
      this.userId = this.user.id;
    });
  }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })
  }

  logout(){
    this.cartService.clearCart();
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}

