import { Component, OnInit } from '@angular/core';
import { FoodModel } from '../../../shared/models/FoodForm_model';
import { FoodService } from '../../../services/food/food.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-delete-page',
  templateUrl: './food-delete-page.component.html',
  styleUrl: './food-delete-page.component.css'
})
export class FoodDeletePageComponent implements OnInit{
  food!:FoodModel;
  foodId:string = '';

  constructor(private foodService:FoodService, private router:Router,private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.foodId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.foodService.getFoodById(this.foodId).subscribe((food) => {
      this.food = food
    })
  }

  confirmDelete(){
    this.foodService.deleteFood(this.foodId).subscribe(()=>{
      this.router.navigateByUrl("admin/changeFoodList");
    });
  }
}
