import { Component } from '@angular/core';
import { FoodModel } from '../../../../shared/models/FoodForm_model';
import { FoodService } from '../../../../services/food/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-change-food-list',
  templateUrl: './admin-change-food-list.component.html',
  styleUrl: './admin-change-food-list.component.css'
})
export class AdminChangeFoodListComponent {
  foodList:FoodModel[] = []
  
  constructor(private foodService:FoodService,private router:Router, activatedRoute:ActivatedRoute){
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
          this.foodList = serverFood;
        })
    })
  }

  onEdit(foodId: string) {
    this.router.navigateByUrl("/admin/editFoodData/" + foodId);
  }

  onDelete(foodId: string) {
    this.router.navigateByUrl("/admin/deleteFoodData/" + foodId)
  } 
}
