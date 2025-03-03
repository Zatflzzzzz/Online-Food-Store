import { Component } from '@angular/core';
import {StarRatingServiceService} from "../../../services/star-rating/star-rating-service.service"
import { Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit{
  public array_stars!: number[];
  private starRating_service: StarRatingServiceService = new StarRatingServiceService;
  @Input() starCount!: number;   // Количество звезд
  @Input() starSize!: number;    // Размер звезд в пикселях

  ngOnInit(): void {
    this.array_stars = this.starRating_service.getAllSrars(this.starCount,this.starSize);
  }
} 
