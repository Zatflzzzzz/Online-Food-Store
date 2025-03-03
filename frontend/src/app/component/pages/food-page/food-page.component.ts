import { Component } from '@angular/core';
import { FoodModel } from '../../../shared/models/FoodForm_model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food/food.service';
import { CartService } from '../../../services/cartService/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  food!:FoodModel;

  constructor(activateRoute:ActivatedRoute,foodService:FoodService,private cartService: CartService, private router:Router){
    activateRoute.params.subscribe((params) => {
      if(params.id)
        foodService.getFoodById(params.id).subscribe((serverFood) => {
          this.food = serverFood;
        });
    })
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  goBack() {
    window.history.back();
  }
}
