import { Injectable } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StarRatingServiceService{
  stars: number[] = [];
  
  getAllSrars = (starCount: number, starSize: number):number[] => {
    const fullStars = Math.floor(starCount);
    const halfStar = starCount % 1 >= 0.5 ? 0.5 : 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      this.stars.push(1); // Полная звезда
    }

    if (halfStar) {
      this.stars.push(0.5); // Половинная звезда
    }

    for (let i = 0; i < emptyStars; i++) {
      this.stars.push(0); // Пустая звезда
    }
    return this.stars;
  }
}
