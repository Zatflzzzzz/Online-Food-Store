import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food/food.service';
import { UserService } from '../../../services/user/user.service';
import { PositiveNumberValidator } from '../../../shared/validators/positiveNumber_validator';
import { ToastrService } from 'ngx-toastr';
import { FoodModel } from '../../../shared/models/FoodForm_model';
import { IFood } from '../../../shared/interfaces/IFood';

@Component({
  selector: 'app-food-edit-page',
  templateUrl: './food-edit-page.component.html',
  styleUrls: ['./food-edit-page.component.css']
})
export class FoodEditPageComponent implements OnInit {
  foodForm!: FormGroup;
  isSubmitted = false;
  returnUrl = "/admin/changeFoodList";
  foodId: string = "";
  food!: FoodModel;

  constructor(
    private formBuilder: FormBuilder,private foodService: FoodService,private router: Router,private activatedRoute: ActivatedRoute
    ,private userService: UserService,private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.foodId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.foodService.getFoodById(this.foodId).subscribe((foodData) => {
      this.food = foodData;

    this.foodForm = this.formBuilder.group({
      name: [this.food.name, [Validators.required, Validators.minLength(1)]],
      price: [this.food.price, Validators.required],
      tags: [this.food.tags.join(','), [Validators.required, Validators.minLength(1)]],
      favorite: [this.food.favorite, Validators.required],
      stars: [this.food.stars, Validators.required],
      imageUrl: [this.food.imageUrl, [Validators.required, Validators.minLength(3)]],
      origins: [this.food.origins.join(','), [Validators.required, Validators.minLength(1)]],
      cookTime: [this.food.cookTime, [Validators.required]],
    }, {
      validators: [
        PositiveNumberValidator('price'), 
        PositiveNumberValidator('stars'),
        PositiveNumberValidator('cookTime')
      ],
    });
    });
  }

  get fc() {
    return this.foodForm.controls;
  }

  async submit() {
    if (!this.userService.currentUser.isAdmin) return;

    this.isSubmitted = true;

    if (this.foodForm.invalid) return;

    const formValue = this.foodForm.value;
    const tagsArray: string[] = formValue.tags.split(',').map((tag: string) => tag.trim());
    const originsArray: string[] = formValue.origins.split(',').map((origin: string) => origin.trim());

    const imageUrl = await this.checkPhotoExists();
    
    const foodData = {
      name: formValue.name,
      price: formValue.price,
      tags: tagsArray,
      favorite: formValue.favorite,
      stars: formValue.stars,
      imageUrl: imageUrl,
      origins: originsArray,
      cookTime: formValue.cookTime,
    };

    this.foodService.editFoodData(foodData, this.foodId).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  async checkPhotoExists(): Promise<string> {
    const formValue = this.foodForm.value;
    const defaultPhoto = '/assets/default.jpg';
    const photoPath = `${formValue.imageUrl}`;

    return fetch(photoPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          return photoPath;
        } else {
          return defaultPhoto;
        }
      })
      .catch(() => defaultPhoto);
  }
}