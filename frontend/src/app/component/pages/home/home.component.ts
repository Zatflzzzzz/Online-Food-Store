import { Component, OnInit } from '@angular/core';
import { FoodModel } from '../../../shared/models/FoodForm_model';
import { FoodService } from '../../../services/food/food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  foods:FoodModel[] = [];
  
  constructor(private foodService: FoodService, activatedRoute:ActivatedRoute){
    let foodsObservable:Observable<FoodModel[]>;

    activatedRoute.params.subscribe((params)=>{
        if(params.searchTerm)
          foodsObservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
        else if(params.tag){
          foodsObservable = this.foodService.getAllFoodByTag(params.tag);
        }
        else{
          foodsObservable = this.foodService.getAll()
        }

        foodsObservable.subscribe((serverFood) => {
          this.foods = serverFood;
        })
    })
  }
}
