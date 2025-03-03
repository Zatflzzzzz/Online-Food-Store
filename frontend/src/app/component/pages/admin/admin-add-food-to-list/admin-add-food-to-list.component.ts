import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../../../../services/food/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { PositiveNumberValidator } from '../../../../shared/validators/positiveNumber_validator';

@Component({
  selector: 'admin-add-food-to-list',
  templateUrl: './admin-add-food-to-list.component.html',
  styleUrls: ['./admin-add-food-to-list.component.css'],
})
export class AdminAddFoodToListComponent implements OnInit {
  foodForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private foodService: FoodService
    , private router: Router,private activatedRoute: ActivatedRoute, private userService:UserService) {}

  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      price: [0, Validators.required],
      tags: ['', [Validators.required, Validators.minLength(1)]],
      favorite: [true, Validators.required],
      stars: [0, Validators.required],
      imageUrl: ['', [Validators.required, Validators.minLength(1)]],
      origins: ['', [Validators.required, Validators.minLength(1)]],
      cookTime: [0, [Validators.required]],
    },{
      validators: [
        PositiveNumberValidator("price"), 
        PositiveNumberValidator("stars"),
        PositiveNumberValidator("cookTime")
      ], 
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
    const tagsArray = formValue.tags.split(',').map((tag: string) => tag.trim());
    const originsArray = formValue.origins.split(',').map((origin: string) => origin.trim());
  
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
  
    this.foodService.addFoodToList(foodData).subscribe(_ => {
      this.router.navigateByUrl("admin/addFoodList");
    })
  }

  checkPhotoExists = (): Promise<string> => {
    const formValue = this.foodForm.value;
    const defaultPhoto = './assets/default.jpg'
    const photosPath = './assets/';

    const photoPath = `${photosPath}${formValue.imageUrl}`;
    const img = new Image();
    img.src = photoPath;

    return new Promise<string>((resolve) => {
      img.onload = () => resolve(photoPath);
      img.onerror = () => resolve(defaultPhoto);
    });
  }
}

