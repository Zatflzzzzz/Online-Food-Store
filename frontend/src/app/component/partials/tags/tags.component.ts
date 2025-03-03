import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { FoodService } from '../../../services/food/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{
  tags?:Tag[];
  @Input() requestFromAdmin!:boolean;
  link!:string;

  constructor(foodService:FoodService){
    foodService.getAllTags().subscribe((serverTags) =>{
    this.tags = serverTags;
   });
  }

  ngOnInit(): void {
    this.link = this.requestFromAdmin ? "/tag_admin/" : "/tag/";
  }
}
