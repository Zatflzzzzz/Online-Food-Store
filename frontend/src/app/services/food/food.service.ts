import { Injectable } from '@angular/core';
import { FoodModel } from '../../shared/models/FoodForm_model';
import { Tag } from '../../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ADMIN_ADD_FOOD_TO_LIST_URL, ADMIN_DELETE_FOOD_URL, ADMIN_EDIT_FOOD_DATA_URL, FOOD_BY_ID_URL, FOOD_BY_SEARCH_URL, FOOD_TAGS_URL, FOOD_URL, FOODS_BY_TAG_URL } from '../../shared/constants/url';
import { IFood } from '../../shared/interfaces/IFood';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http:HttpClient, private toastrService:ToastrService, userService:UserService){}
  
  getAll():Observable<FoodModel[]>{
    return this.http.get<FoodModel[]>(FOOD_URL);
  }

  getAllFoodBySearchTerm(searchTerm: string){
    return this.http.get<FoodModel[]>(FOOD_BY_SEARCH_URL + searchTerm);
  }

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOOD_TAGS_URL);
  }

  getAllFoodByTag(tag:string):Observable<FoodModel[]>{
    return tag == "All" ? this.getAll() : this.http.get<FoodModel[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId:string):Observable<FoodModel>{
      return this.http.get<FoodModel>(FOOD_BY_ID_URL + foodId).pipe(tap({
        next:()=>{},
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error, 'Error')
        }
    }));
  }

  addFoodToList(foodModel:IFood):Observable<IFood>{
    return this.http.post<IFood>(ADMIN_ADD_FOOD_TO_LIST_URL, foodModel).pipe(tap({
      next:()=>{
        this.toastrService.success(
          'You have successfully added the dish to the site'
        )
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, 'Error adding')
      }
    }))
  } 
  
  editFoodData(foodData:IFood, foodId: string){
    return this.http.put<FoodModel>(ADMIN_EDIT_FOOD_DATA_URL + foodId, foodData).pipe(tap({
      next:()=>{
        this.toastrService.success('You have successfully edit data of the dish')
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, 'Error with the change')
      }
    }))
  }

  deleteFood(foodId:string){
    return this.http.delete<FoodModel>(ADMIN_DELETE_FOOD_URL + foodId).pipe(tap({
      next:()=>{
        this.toastrService.success('You have successfully delete dish')
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, 'Error with deletion')
      }
    }))
  }
}
